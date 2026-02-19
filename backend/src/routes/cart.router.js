import { Router } from "express";
import { cartController } from "../controllers/cart.controller.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { passportCall } from "../middlewares/passport.middleware.js";

const router = Router();

//crear el carrito - logica implementada al momento del registro.
router.post("/", 
    passportCall('jwt'), 
    authorization(['user']), 
    cartController.create
);

//agregar productos al carrito 
router.post("/:cid/product/:pid", 
    passportCall('jwt'), 
    authorization(['user']), 
    cartController.addProduct
);

// Ver un carrito específico
router.get("/:cid", passportCall('jwt'), cartController.getCartById);

// 🛒 FINALIZAR COMPRA
// Solo permitimos que un 'user' finalice la compra
router.post("/:cid/purchase", 
    passportCall('jwt'), 
    authorization(['user']), 
    cartController.purchase
);

export default router;