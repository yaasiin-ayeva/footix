import { Router } from "express";
import UserController from "../controller/user.controller";

const userRoutes = Router()
const controller = new UserController()

userRoutes.get('/get', controller.loadUserHandler)
userRoutes.get('/get/:id', controller.loadUserByIdHandler)
userRoutes.delete('/delete/:id', controller.deleteUserHandler)

export default userRoutes