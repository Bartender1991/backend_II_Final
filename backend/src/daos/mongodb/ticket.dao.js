import MongoDao from "./MongoDao.js";
import { TicketModel } from "./models/ticket.model.js";

class TicketMongoDao extends MongoDao {
    constructor(model) {
        super(model);
    }

    getByCode = async (code) => {
        try {
            return await this.model.findOne({ code });
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const ticketMongoDao = new TicketMongoDao(TicketModel);