
import Product from '../schemas/Product';
import AppError from '../shared/errors/AppError';

class CreateProductService {

  async run({name, price, stock, departments}) {
 
    const product = new Product({
      name, 
      price,
      stock,
      departments
    });

    product.save();

    return product;
    
  }

}

export default new CreateProductService();