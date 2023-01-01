import { Router } from "express";
import H2HController from "../controller/H2H.controller";

const h2hRoutes = Router()
const controller = new H2HController()

h2hRoutes.get('/create', controller.createH2HFromXLSXHandler)

export default h2hRoutes