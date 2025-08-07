// src/repositories/product.repository.js
import ProductDao from '../daos/mongodb/product.dao.js';

class ProductRepository {
  constructor() {
    this.dao = ProductDao;
  }
  
  async getProducts(filter, options) {
    return await this.dao.getProducts(filter, options);
  }

  async getProductById(id) {
    return await this.dao.findById(id);
  }
  
  async createProduct(productData) {
    return await this.dao.create(productData);
  }

  async updateProduct(id, productData) {
    return await this.dao.update(id, productData);
  }

  async deleteProduct(id) {
    return await this.dao.delete(id);
  }
}


export default ProductRepository;