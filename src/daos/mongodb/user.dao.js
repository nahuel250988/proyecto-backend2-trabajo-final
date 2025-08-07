// src/daos/mongodb/user.dao.js
import User from '../../models/user.model.js';

class UserDao {
  async findById(id) {
    return await User.findById(id);
  }

  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async create(userData) {
    return await User.create(userData);
  }

  async update(id, userData) {
    return await User.findByIdAndUpdate(id, userData, { new: true });
  }

  async delete(id) {
    return await User.findByIdAndDelete(id);
  }
}

// ✅ Asegúrate de que esta línea esté al final
export default new UserDao();