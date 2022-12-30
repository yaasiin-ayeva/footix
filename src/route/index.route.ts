import { Router } from "express";
import authenticationMiddleware from "../middleweare/authentication.middleware";
import authRoutes from "./auth.route";
import userRoutes from "./user.route";

const apiRouter = Router()

apiRouter.use('/auth', authRoutes);
apiRouter.use('/users', authenticationMiddleware, userRoutes);

export default apiRouter

