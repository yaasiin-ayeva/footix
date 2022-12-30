import { Router } from "express";
import RoleController from "../controller/role.controller";

const userRoutes = Router()
const controller = new RoleController()

userRoutes.get('/add', controller.createHandler)
userRoutes.get('/get-all', controller.loadAllHandler)
userRoutes.delete('/delete/:id', controller.deleteHandler)

export default userRoutes