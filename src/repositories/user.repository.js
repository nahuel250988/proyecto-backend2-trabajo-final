import UserDao from '../daos/mongodb/user.dao.js';

class UserRepository {
    constructor() {
        this.dao = UserDao;
    }

    async registerUser(userData) {
        
        return await this.dao.create(userData);
    }
    
    async findUserByEmail(email) {
        
        return await this.dao.findByEmail(email);
    }

    async findUserById(id) {
        
        return await this.dao.findById(id);
    }
}


export default UserRepository;