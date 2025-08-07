import ProductRepository from '../repositories/product.repository.js';
import CartRepository from '../repositories/cart.repository.js';

class ViewController {
  constructor() {
    this.productRepository = new ProductRepository();
    this.cartRepository = new CartRepository();
  }

  async getProductsView(req, res) {
    try {
      const { limit, page, sort, query } = req.query;
      const productsData = await this.productRepository.getProducts(limit, page, sort, query);
      const user = req.user;

      res.render('products', {
        products: productsData.docs,
        pagination: {
          hasPrevPage: productsData.hasPrevPage,
          hasNextPage: productsData.hasNextPage,
          prevLink: productsData.prevLink,
          nextLink: productsData.nextLink,
          page: productsData.page,
        },
        user,
      });
    } catch (error) {
      res.status(500).render('error', { error: error.message });
    }
  }

  async getCartView(req, res) {
    try {
      const { cid } = req.params;
      const cart = await this.cartRepository.getCart(cid);
      if (!cart) {
        return res.status(404).render('error', { error: 'Carrito no encontrado' });
      }
      res.render('cart', { cart });
    } catch (error) {
      res.status(500).render('error', { error: error.message });
    }
  }

  getLoginView(req, res) {
    res.render('login');
  }

  getRegisterView(req, res) {
    res.render('register');
  }
}

export default new ViewController();