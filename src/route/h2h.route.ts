import { Router } from "express";
import H2HController from "../controller/H2H.controller";

const h2hRoutes = Router();
const controller = new H2HController();

h2hRoutes.get('/save', controller.createFromXlsxHandler);
h2hRoutes.get('/all', controller.loadAllHandler);
h2hRoutes.get('/season/:season', controller.loadBySeasonHandler);
h2hRoutes.get('/get/:id', controller.loadByIdHandler);

export default h2hRoutes;