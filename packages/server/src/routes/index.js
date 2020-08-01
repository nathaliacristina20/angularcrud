import { Router } from "express";

import departmentsRouter from "../routes/departments.routes";
import productsRouter from "../routes/products.routes";

const routes = new Router();

routes.use('/departments', departmentsRouter);
routes.use('/products', productsRouter);

export default routes;
