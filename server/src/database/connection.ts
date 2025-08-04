import mongoose from 'mongoose';
import logger from 'jet-logger';
import ENV from '@src/common/constants/ENV';

/******************************************************************************
                                MongoDB Connection
******************************************************************************/

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private isConnected = false;

  private constructor() {}

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public async connect(): Promise<void> {
    if (this.isConnected) {
      return;
    }

    try {
      await mongoose.connect(ENV.MongoDbUri, {
        // Mongoose 6+ doesn't need useNewUrlParser or useUnifiedTopology
      });

      this.isConnected = true;
      logger.info('Connected to MongoDB successfully');

      // Handle connection events
      mongoose.connection.on('error', (error: Error) => {
        logger.err('MongoDB connection error:', true);
        logger.err(error, true);
      });

      mongoose.connection.on('disconnected', () => {
        logger.warn('MongoDB disconnected');
        this.isConnected = false;
      });

      // Graceful shutdown
      process.on('SIGINT', this.gracefulShutdown.bind(this));
      process.on('SIGTERM', this.gracefulShutdown.bind(this));
    } catch (error) {
      logger.err('Failed to connect to MongoDB:', true);
      logger.err(error as Error, true);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      return;
    }

    try {
      await mongoose.disconnect();
      this.isConnected = false;
      logger.info('Disconnected from MongoDB');
    } catch (error) {
      logger.err('Error disconnecting from MongoDB:', true);
      logger.err(error as Error, true);
      throw error;
    }
  }

  private async gracefulShutdown(): Promise<void> {
    logger.info('Gracefully shutting down MongoDB connection...');
    await this.disconnect();
    process.exit(0);
  }

  public isConnectionActive(): boolean {
    return this.isConnected && mongoose.connection.readyState === 1;
  }
}

export default DatabaseConnection.getInstance();
