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

                    await productService.update(product._id, {
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
                purchaser: userEmail,
                items: itemsToBuy
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

    create = async () => {
        try {
            // Llamamos al repository para crear un carrito vacío
            return await cartRepository.create({ products: [] });
        } catch (error) {
            throw new Error(`Error al crear carrito en Service: ${error.message}`);
        }
    }

    addProduct = async (cartId, productId, quantity = 1) => {
        try {
            const cart = await cartRepository.getById(cartId);
            if (!cart) throw new Error("Carrito no encontrado");

            // Buscamos si el producto ya está en el carrito
            const productIndex = cart.products.findIndex(
                p => p.product._id?.toString() === productId || p.product.toString() === productId
            );

            if (productIndex !== -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }

            return await cartRepository.update(cartId, { products: cart.products });
        } catch (error) {
            throw new Error(`Error al agregar producto: ${error.message}`);
        }
    }
}

export const cartService = new CartService();