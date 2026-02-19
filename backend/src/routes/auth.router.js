import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { passportCall } from "../middlewares/passport.middleware.js";

const router = Router();

router.post("/register", authController.register);

// No necesitan token (para entrar al sistema)
router.post("/login", authController.login);

// El current sí necesita validar el token
router.get("/current", passportCall('jwt'), authController.current);

export default router;