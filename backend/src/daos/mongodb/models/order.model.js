import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: { type: String, required: true },
    items: [
        {
            product_id: String,
            name: String,
            quantity: Number,
            price: Number
        }
    ],
    total: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ['pending', 'completed', 'cancelled'], 
        default: 'pending' 
    },
    createdAt: { type: Date, default: Date.now }
});

export const OrderModel = mongoose.model('orders', orderSchema);