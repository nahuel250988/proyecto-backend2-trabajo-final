// src/repositories/cart.repository.js
import CartDao from '../daos/mongodb/cart.dao.js';
import ProductDao from '../daos/mongodb/product.dao.js';
import TicketDao from '../daos/mongodb/ticket.dao.js';

class CartRepository {
  async createCart() {
    return await CartDao.create();
  }

  async getCart(id) {
    return await CartDao.getCartWithProducts(id);
  }

  async addProductToCart(cartId, productId) {
    const cart = await CartDao.findById(cartId);
    if (!cart) return null;

    const productInCart = cart.products.find(p => p.product.toString() === productId);
    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    return await CartDao.update(cartId, cart);
  }

  async updateCartProducts(cartId, newProducts) {
    const cart = await CartDao.findById(cartId);
    if (!cart) return null;

    cart.products = newProducts;
    return await CartDao.update(cartId, cart);
  }

  async updateProductQuantity(cartId, productId, quantity) {
    const cart = await CartDao.findById(cartId);
    if (!cart) return null;

    const productInCart = cart.products.find(p => p.product.toString() === productId);
    if (productInCart) {
      productInCart.quantity = quantity;
    }

    return await CartDao.update(cartId, cart);
  }

  async deleteProductFromCart(cartId, productId) {
    const cart = await CartDao.findById(cartId);
    if (!cart) return null;

    cart.products = cart.products.filter(p => p.product.toString() !== productId);

    return await CartDao.update(cartId, cart);
  }

  async clearCart(cartId) {
    const cart = await CartDao.findById(cartId);
    if (!cart) return null;

    cart.products = [];

    return await CartDao.update(cartId, cart);
  }

  async purchaseCart(cartId, userEmail) {
    const cart = await CartDao.getCartWithProducts(cartId);
    if (!cart) return null;

    const productsToPurchase = [];
    const productsNotPurchased = [];
    let totalAmount = 0;

    for (const item of cart.products) {
        const product = item.product;
        if (product && product.stock >= item.quantity) {
            await ProductDao.update(product._id, { stock: product.stock - item.quantity });

            productsToPurchase.push({ product: product._id, quantity: item.quantity });
            totalAmount += product.price * item.quantity;
        } else {
            productsNotPurchased.push(item);
        }
    }

    if (productsToPurchase.length > 0) {
        const newTicket = await TicketDao.create({
            code: Math.random().toString(36).substring(2, 8),
            amount: totalAmount,
            purchaser: userEmail
        });

        cart.products = productsNotPurchased;
        await CartDao.update(cartId, cart);

        return newTicket;
    }

    return null;
  }
}


export default CartRepository;