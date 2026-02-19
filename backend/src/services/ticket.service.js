import { ticketRepository } from "../repositories/ticket.repository.js";
import { v4 as uuidv4 } from 'uuid';

class TicketService {
    createTicket = async (ticketData) => {
        try {
            // Generamos la estructura que pide el modelo de Ticket
            const newTicket = {
                code: uuidv4(), // Genera un código único tipo '1b9d6bcd-b1d2...'
                purchase_datetime: new Date(),
                amount: ticketData.amount,
                purchaser: ticketData.purchaser
            };
            
            return await ticketRepository.create(newTicket);
        } catch (error) {
            throw new Error(`TicketService Error: ${error.message}`);
        }
    }
}

export const ticketService = new TicketService();