import { Router } from "express";

import departmentsRouter from "../routes/departments.routes";

const routes = new Router();

routes.use('/departments', departmentsRouter);

export default routes;
