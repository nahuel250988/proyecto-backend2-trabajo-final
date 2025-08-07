import ProductRepository from '../repositories/product.repository.js';

class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getProducts(req, res) {
    try {
      const { limit, page, sort, query } = req.query;
      const products = await this.productRepository.getProducts(limit, page, sort, query);
      res.json({ status: 'success', payload: products });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  async getProductById(req, res) {
    try {
      const { pid } = req.params;
      const product = await this.productRepository.getProductById(pid);
      if (!product) {
        return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
      }
      res.json({ status: 'success', payload: product });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  async createProduct(req, res) {
    try {
      const productData = req.body;
      const newProduct = await this.productRepository.createProduct(productData);
      res.status(201).json({ status: 'success', payload: newProduct });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const { pid } = req.params;
      const productData = req.body;
      const updatedProduct = await this.productRepository.updateProduct(pid, productData);
      if (!updatedProduct) {
        return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
      }
      res.json({ status: 'success', payload: updatedProduct });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { pid } = req.params;
      const deletedProduct = await this.productRepository.deleteProduct(pid);
      if (!deletedProduct) {
        return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
      }
      res.json({ status: 'success', message: 'Producto eliminado' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }
}

export default new ProductController();