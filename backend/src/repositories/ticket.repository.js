import { ticketDao } from "../daos/index.js"; // Importado desde tu factory
import BaseRepository from "./base.repository.js";

class TicketRepository extends BaseRepository {
    constructor(dao) {
        super(dao);
    }

    createTicket = async (ticketData) => {
        try {
            return await this.dao.create(ticketData);
        } catch (error) {
            // Pasamos el error completo para que el Service pueda ver el código 11000 de MongoDB
            throw error;
        }
    }
}

export const ticketRepository = new TicketRepository(ticketDao);