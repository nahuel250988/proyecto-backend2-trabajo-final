// src/daos/mongodb/product.dao.js
import Product from '../../models/product.model.js';
import { mongoose } from 'mongoose';

class ProductDao {
  async getProducts(filter, options) {
    return await Product.paginate(filter, options);
  }

  async findById(id) {
    return await Product.findById(id);
  }

  async create(productData) {
    return await Product.create(productData);
  }

  async update(id, productData) {
    return await Product.findByIdAndUpdate(id, productData, { new: true });
  }

  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }
}


export default new ProductDao();