import CartRepository from '../repositories/cart.repository.js';
import ProductRepository from '../repositories/product.repository.js';

class CartController {
  constructor() {
    this.cartRepository = new CartRepository();
    this.productRepository = new ProductRepository();
  }

  async createCart(req, res) {
    try {
      const newCart = await this.cartRepository.createCart();
      res.status(201).json({ status: 'success', payload: newCart });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  async getCart(req, res) {
    try {
      const { cid } = req.params;
      const cart = await this.cartRepository.getCart(cid);
      if (!cart) {
        return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
      }
      res.json({ status: 'success', payload: cart });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }
  
  async addProductToCart(req, res) {
    try {
      const { cid, pid } = req.params;
      const updatedCart = await this.cartRepository.addProductToCart(cid, pid);
      if (!updatedCart) {
        return res.status(404).json({ status: 'error', message: 'Carrito o producto no encontrado' });
      }
      res.json({ status: 'success', payload: updatedCart });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }
  
  async updateCartProducts(req, res) {
    try {
      const { cid } = req.params;
      const newProducts = req.body.products;
      const updatedCart = await this.cartRepository.updateCartProducts(cid, newProducts);
      if (!updatedCart) {
        return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
      }
      res.json({ status: 'success', payload: updatedCart });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }
  
  async updateProductQuantity(req, res) {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const updatedCart = await this.cartRepository.updateProductQuantity(cid, pid, quantity);
      if (!updatedCart) {
        return res.status(404).json({ status: 'error', message: 'Carrito o producto no encontrado' });
      }
      res.json({ status: 'success', payload: updatedCart });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }
  
  async deleteProductFromCart(req, res) {
    try {
      const { cid, pid } = req.params;
      const updatedCart = await this.cartRepository.deleteProductFromCart(cid, pid);
      if (!updatedCart) {
        return res.status(404).json({ status: 'error', message: 'Carrito o producto no encontrado' });
      }
      res.json({ status: 'success', payload: updatedCart });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }
  
  async clearCart(req, res) {
    try {
      const { cid } = req.params;
      const updatedCart = await this.cartRepository.clearCart(cid);
      if (!updatedCart) {
        return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
      }
      res.json({ status: 'success', payload: updatedCart });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }
}

export default new CartController();