import TicketDao from '../daos/mongodb/ticket.dao.js';

class TicketRepository {
  async getTicketById(id) {
    return await TicketDao.findById(id);
  }
}

export default new TicketRepository();