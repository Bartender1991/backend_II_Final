import { productService } from "../services/product.service.js";

class ProductController {
    getAll = async (req, res) => {
        try {
            const products = await productService.getAll(req.query);
            return res.send({ status: "success", payload: products });
        } catch (error) {
            return res.status(500).send({ status: "error", message: error.message });
        }
    }

    create = async (req, res) => {
        try {
            const result = await productService.create(req.body);
            return res.status(201).send({ status: "success", payload: result });
        } catch (error) {
            return res.status(400).send({ status: "error", message: error.message });
        }
    }

    delete = async (req, res) => {
        try {
            const { pid } = req.params;
            await productService.delete(pid);
            return res.send({ status: "success", message: "Producto eliminado" });
        } catch (error) {
            return res.status(400).send({ status: "error", message: error.message });
        }
    }
}

export const productController = new ProductController();