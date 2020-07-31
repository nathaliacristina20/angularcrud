import { Router } from 'express';

import DepartmentsController from '../app/controllers/DepartmentsController';

const departmentsRouter = Router();
const departmentsController = new DepartmentsController();

departmentsRouter.get("/", departmentsController.index);
departmentsRouter.post("/", departmentsController.store);
departmentsRouter.patch("/:id", departmentsController.update);
departmentsRouter.delete("/:id", departmentsController.delete);

export default departmentsRouter;