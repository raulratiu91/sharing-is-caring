import { Router } from 'express';

import Paths from '@src/common/constants/Paths';
import UserRoutes from './UserRoutes';
import AuthRoutes from './AuthRoutes';
import ApiRoutes from './api';


/******************************************************************************
                                Setup
******************************************************************************/

const apiRouter = Router();


// ** Add UserRouter ** //

// Init router
const userRouter = Router();

// Get all users
userRouter.get(Paths.Users.Get, UserRoutes.getAll);
userRouter.post(Paths.Users.Add, UserRoutes.add);
userRouter.put(Paths.Users.Update, UserRoutes.update);
userRouter.delete(Paths.Users.Delete, UserRoutes.delete);

// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);

// ** Add AuthRouter ** //

// Init auth router
const authRouter = Router();

// Auth routes
authRouter.post(Paths.Auth.Register, AuthRoutes.register);
authRouter.post(Paths.Auth.Login, AuthRoutes.login);
authRouter.get(Paths.Auth.Me, ...AuthRoutes.getMe);
authRouter.put(Paths.Auth.Me, ...AuthRoutes.updateMe);
authRouter.post(Paths.Auth.Logout, ...AuthRoutes.logout);

// Add AuthRouter
apiRouter.use(Paths.Auth.Base, authRouter);

// ** Add API Routes for MongoDB data ** //
apiRouter.use('/data', ApiRoutes);


/******************************************************************************
                                Export default
******************************************************************************/

export default apiRouter;
