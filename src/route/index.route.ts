import { Router } from "express";
import authenticationMiddleware from "../middleweare/authentication.middleware";
import rolePoliceMiddleware from "../middleweare/rolePolice.middleware";
import authRoutes from "./auth.route";
import h2hRoutes from "./h2h.route";
import roleRoutes from "./role.route";
import userRoutes from "./user.route";

const apiRouter = Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/users', authenticationMiddleware, userRoutes);
apiRouter.use('/roles', authenticationMiddleware, rolePoliceMiddleware, roleRoutes);
apiRouter.use('/h2h', authenticationMiddleware, rolePoliceMiddleware, h2hRoutes);

export default apiRouter;

