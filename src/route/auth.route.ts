import { Router } from "express";
import AuthController from "../controller/auth.controller";

const authRoutes = Router()
const controller = new AuthController()

authRoutes.get('/login', controller.loginHandler)
authRoutes.get('/register', controller.registerHandler)

export default authRoutes