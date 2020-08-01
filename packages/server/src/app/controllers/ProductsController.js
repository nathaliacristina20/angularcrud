import Product from "../schemas/Product";

import CreateProductService from "../services/CreateProductService";
import UpdateProductService from "../services/UpdateProductService";

class ProductsController {
  async index(_, res) {
    const products = await Product.find();
    return res.json(products);
  }

  async store(req, res) {
    const { name, price, stock, departments } = req.body;
    const product = await CreateProductService.run({
      name,
      price,
      stock,
      departments,
    });
    return res.json(product);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, price, stock, departments } = req.body;
    const product = await UpdateProductService.run({
      id,
      name,
      price,
      stock,
      departments,
    });
    return res.json(product);
  }

  async delete(req, res) {
    const { id } = req.params;
    await Product.deleteOne({ _id: id });
    return res.status(204).send("");
  }
}

export default ProductsController;
