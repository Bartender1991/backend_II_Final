import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const ticketCollection = 'tickets';

// En TicketModel.js
const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        default: () => uuidv4()
    },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
    items: [
        {
            product_id: String,
            name: String,
            quantity: Number,
            price: Number
        }
    ]
});

export const TicketModel = mongoose.model(ticketCollection, ticketSchema);