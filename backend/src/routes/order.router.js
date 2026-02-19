import { Router } from "express";
import { orderController } from "../controllers/order.controller.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { passportCall } from "../middlewares/passport.middleware.js";

const router = Router();

// Solo el ADMIN peude ver todas las órdenes del sistema
router.get("/", passportCall('jwt'), authorization('admin'), orderController.getAllOrders);

// El usuario podría ver una orden específica (suya)
router.get("/:oid", passportCall('jwt'), authorization(['user', 'admin']), orderController.getOrderById);

export default router;