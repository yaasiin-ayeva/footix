import { Router } from "express";
import authenticationMiddleware from "../middleweare/authentication.middleware";
import userRoutes from "./user.route";

const apiRouter = Router()

apiRouter.use('/users', authenticationMiddleware, userRoutes)

export default apiRouter

