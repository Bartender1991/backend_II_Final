import mongoose from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    // Definimos que el carrito contiene un arreglo de productos
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products' // Referencia a la colección de productos
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],
        default: [] // Por defecto, el carrito nace vacío []
    }
});

export const CartModel = mongoose.model(cartCollection, cartSchema);