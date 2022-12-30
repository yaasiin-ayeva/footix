import { Router } from "express";
import authenticationMiddleware from "../middleweare/authentication.middleware";
import roleCheckingMiddleware from "../middleweare/roleChecking.middleware";
import authRoutes from "./auth.route";
import roleRoutes from "./role.route";
import userRoutes from "./user.route";

const apiRouter = Router()

apiRouter.use('/auth', authRoutes);
apiRouter.use('/users', authenticationMiddleware, userRoutes);
apiRouter.use('/roles', authenticationMiddleware, roleCheckingMiddleware, roleRoutes);

export default apiRouter

