// src/daos/mongodb/cart.dao.js
import Cart from '../../models/cart.model.js';

class CartDao {
  async findById(id) {
    return await Cart.findById(id);
  }

  async getCartWithProducts(id) {
    return await Cart.findById(id).populate('products.product');
  }

  async create() {
    return await Cart.create({ products: [] });
  }

  async update(id, cartData) {
    return await Cart.findByIdAndUpdate(id, cartData, { new: true });
  }

  async delete(id) {
    return await Cart.findByIdAndDelete(id);
  }
}

export default new CartDao();