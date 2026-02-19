import { Router } from "express";
import { productController } from "../controllers/product.controller.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { passportCall } from "../middlewares/passport.middleware.js";

const router = Router();

router.get("/", productController.getAll);

router.post("/", passportCall('jwt'), authorization('admin'), productController.create);
router.delete("/:pid", passportCall('jwt'), authorization('admin'), productController.delete);

export default router;