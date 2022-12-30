import { Router } from "express";
import RoleController from "../controller/role.controller";

const roleRoutes = Router()
const controller = new RoleController()

roleRoutes.get('/add', controller.createHandler)
roleRoutes.get('/get-all', controller.loadAllHandler)
roleRoutes.delete('/delete/:id', controller.deleteHandler)

export default roleRoutes