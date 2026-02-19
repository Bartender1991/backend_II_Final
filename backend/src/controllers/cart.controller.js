import { cartService } from "../services/cart.service.js";

class CartController {
    
    purchase = async (req, res) => {
        try {
            const { cid } = req.params;
            
            const userEmail = req.user?.email;

            if (!userEmail) {
                return res.status(401).json({ 
                    status: "error", 
                    message: "No autorizado: No se encontró el email del usuario" 
                });
            }

            const result = await cartService.purchase(cid, userEmail);

            return res.status(200).json({
                status: "success",
                message: "Compra finalizada con éxito",
                payload: result
            });

        } catch (error) {
            return res.status(400).json({
                status: "error",
                message: error.message
            });
        }
    }

    getCartById = async (req, res) => {
        try {
            const { cid } = req.params;
            const cart = await cartService.getCart(cid);
            return res.status(200).json({ status: "success", payload: cart });
        } catch (error) {
            return res.status(404).json({ status: "error", message: error.message });
        }
    }

    create = async (req, res) => {
        try {
            const newCart = await cartService.create();
            return res.status(201).json({ status: "success", payload: newCart });
        } catch (error) {
            return res.status(500).json({ status: "error", message: error.message });
        }
    }

    addProduct = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const result = await cartService.addProduct(cid, pid, quantity || 1);
            return res.status(200).json({ status: "success", payload: result });
        } catch (error) {
            return res.status(400).json({ status: "error", message: error.message });
        }
    }
}

export const cartController = new CartController();