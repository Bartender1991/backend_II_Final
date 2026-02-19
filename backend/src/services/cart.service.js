import { cartRepository } from "../repositories/cart.repository.js";
import { productService } from "./product.service.js";
import { orderService } from "./order.service.js";
import { ticketService } from "./ticket.service.js";

class CartService {
    getCart = async (id) => {
        try {
            return await cartRepository.getCartWithProducts(id);
        } catch (error) {
            throw new Error(`Error al obtener carrito: ${error.message}`);
        }
    }

   purchase = async (cartId, userEmail) => {
        try {
            const cart = await cartRepository.getCartWithProducts(cartId);
            if (!cart) throw new Error("Carrito no encontrado");

            const itemsToBuy = [];
            const productsWithoutStock = [];
            let totalAmount = 0;

            for (const item of cart.products) {
                const product = item.product;
                if (product.stock >= item.quantity) {
                    itemsToBuy.push({
                        product_id: product._id.toString(),
                        name: product.name,
                        quantity: item.quantity,
                        price: product.price
                    });
                    totalAmount += product.price * item.quantity;
                    
                    await productService.updateProduct(product._id, { 
                        stock: product.stock - item.quantity 
                    });
                } else {
                    productsWithoutStock.push(item);
                }
            }

            if (itemsToBuy.length === 0) {
                throw new Error("No hay stock disponible para los productos seleccionados.");
            }

            const order = await orderService.createOrder({
                user: userEmail,
                items: itemsToBuy,
                total: totalAmount,
                status: 'pending' 
            });

            const ticket = await ticketService.createTicket({
                amount: totalAmount,
                purchaser: userEmail
            });

            await orderService.updateOrderStatus(order._id, 'completed');

            await cartRepository.update(cartId, { products: productsWithoutStock });

            return {
                ticket,
                orderId: order._id,
                unprocessedProducts: productsWithoutStock.map(p => p.product._id)
            };

        } catch (error) {
            throw new Error(`CartService Purchase Error: ${error.message}`);
        }
    }
}

export const cartService = new CartService();