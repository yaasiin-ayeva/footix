import { Router } from "express";
import H2HController from "../controller/H2H.controller";

const h2hRoutes = Router();
const controller = new H2HController();

h2hRoutes.get('/save', controller.createFromXlsxHandler);
h2hRoutes.get('/all', controller.loadAllHandler);

export default h2hRoutes;