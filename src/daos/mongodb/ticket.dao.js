// src/daos/mongodb/ticket.dao.js
import Ticket from '../../models/ticket.model.js';

class TicketDao {
  async findById(id) {
    return await Ticket.findById(id);
  }

  async create(ticketData) {
    return await Ticket.create(ticketData);
  }

  async update(id, ticketData) {
    return await Ticket.findByIdAndUpdate(id, ticketData, { new: true });
  }

  async delete(id) {
    return await Ticket.findByIdAndDelete(id);
  }
}

export default new TicketDao();