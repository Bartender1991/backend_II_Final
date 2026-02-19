import { orderRepository } from "../repositories/order.repository.js";

class OrderService {
    createOrder = async (orderData) => {
        try {
            return await orderRepository.create(orderData);
        } catch (error) {
            throw new Error(`OrderService Error: ${error.message}`);
        }
    }

    updateOrderStatus = async (id, status) => {
        try {
            return await orderRepository.update(id, { status });
        } catch (error) {
            throw new Error(`OrderService Update Error: ${error.message}`);
        }
    }

    getOrderById = async (id) => {
        try {
            const order = await orderRepository.getById(id);
            if (!order) throw new Error("Orden no encontrada");
            return order;
        } catch (error) {
            throw new Error(`OrderService Error: ${error.message}`);
        }
    }
}

export const orderService = new OrderService();