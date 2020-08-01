
import Product from '../schemas/Product';
import AppError from '../shared/errors/AppError';

class UpdateProductService {

  async run({id, name, price, stock, departments}) { 
  
    const product = await Product.findById({ _id: id });

      if (!product) {
        throw new AppError('Product not found');
      }

      product.name = name;
      product.price = price;
      product.stock = stock;
      product.departments = departments;

      await product.save();

      return product;    
    
  }

}

export default new UpdateProductService();