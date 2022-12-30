import { Router } from "express";
import UserController from "../controller/user.controller";

const userRoutes = Router()
const controller = new UserController()

userRoutes.get('/get', controller.loadHandler)
userRoutes.get('/get/:id', controller.loadByIdHandler)
userRoutes.delete('/delete/:id', controller.deleteHandler)

export default userRoutes