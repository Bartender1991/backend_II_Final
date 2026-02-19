import { orderService } from "../services/order.service.js";

class OrderController {
    // Para que un Admin vea todas las ventas
    getAllOrders = async (req, res) => {
        try {
            const orders = await orderService.getAll(); 
            return res.status(200).json({ status: "success", payload: orders });
        } catch (error) {
            return res.status(500).json({ status: "error", message: error.message });
        }
    }

    // Para que el usuario vea UNA orden específica
    getOrderById = async (req, res) => {
        try {
            const { oid } = req.params;
            const order = await orderService.getOrderById(oid);
            return res.status(200).json({ status: "success", payload: order });
        } catch (error) {
            return res.status(404).json({ status: "error", message: error.message });
        }
    }
}

export const orderController = new OrderController();