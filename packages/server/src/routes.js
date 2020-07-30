import { Router } from "express";

import DepartmentController from "./app/controllers/DepartmentController";

const routes = new Router();

routes.get("/departments", DepartmentController.index);
routes.post("/departments", DepartmentController.store);
routes.patch("/departments/:id", DepartmentController.update);
routes.delete("/departments/:id", DepartmentController.delete);

export default routes;
