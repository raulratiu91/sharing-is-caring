#!/usr/bin/env node

/**
 * Database seeding script
 * Usage: npm run seed
 */

import 'module-alias/register';
import { seedDatabase } from '@src/database/seed';
import logger from 'jet-logger';

// Check for command line arguments
const args = process.argv.slice(2);
const clearFirst = !args.includes('--no-clear');

logger.info('🌱 Database Seeding Script');
logger.info(`Clear existing data: ${clearFirst ? 'Yes' : 'No'}`);
logger.info('=====================================');

seedDatabase(clearFirst)
  .then(() => {
    logger.info('✅ Seeding completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    logger.err('❌ Seeding failed:', true);
    logger.err(error, true);
    process.exit(1);
  });
