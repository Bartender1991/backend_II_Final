import mongoose from 'mongoose';

const userCollection = 'users';

const userSchema = new mongoose.Schema({

    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true }, // HASH
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts'
    },
    orders: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'tickets' // O 'orders', según cómo nombres tu modelo de ticket después
            }
        ],
        default: []
    },
    role: { type: String, default: 'user' },
    active: { type: Boolean, default: true },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts" 
    }
});

export const UserModel = mongoose.model(userCollection, userSchema);