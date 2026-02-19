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
}

export const cartController = new CartController();