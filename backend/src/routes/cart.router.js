import { Router } from "express";
import { cartController } from "../controllers/cart.controller.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { passportCall } from "../middlewares/passport.middleware.js";

const router = Router();

router.post("/", passportCall('jwt'), cartController.create);

router.post("/:cid/product/:pid", passportCall('jwt'), cartController.addProduct);

// Ver un carrito específico
router.get("/:cid", passportCall('jwt'), cartController.getCartById);

// 🛒 FINALIZAR COMPRA
// Solo permitimos que un 'user' (o 'premium' si quisieras) finalice la compra
router.post("/:cid/purchase", 
    passportCall('jwt'), 
    authorization(['user', 'premium', 'admin']), 
    cartController.purchase
);

export default router;