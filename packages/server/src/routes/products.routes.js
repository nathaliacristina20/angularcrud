import { Router } from 'express';

import ProductsController from '../app/controllers/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get("/", productsController.index);
productsRouter.post("/", productsController.store);
productsRouter.patch("/:id", productsController.update);
productsRouter.delete("/:id", productsController.delete);

export default productsRouter;