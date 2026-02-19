import { productRepository } from "../repositories/product.repository.js";

class ProductService {
    getAll = async () => {
        try {
            return await productRepository.getAll();
        } catch (error) {
            throw new Error(`Error en ProductService.getAll: ${error.message}`);
        }
    }

    getById = async (id) => {
        try {
            const product = await productRepository.getById(id);
            if (!product) throw new Error("Producto no encontrado");
            return product;
        } catch (error) {
            throw new Error(`Error en ProductService.getById: ${error.message}`);
        }
    }

    getByName = async (name) => {
        try {
            return await productRepository.getProductByName(name);
        } catch (error) {
            throw new Error(`Error en ProductService.getByName: ${error.message}`);
        }
    }

    // Crear un producto con validaciones básicas
    create = async (productData) => {
        try {
            if (productData.stock < 0) throw new Error("El stock no puede ser negativo");

            return await productRepository.create(productData);
        } catch (error) {
            throw new Error(`Error en ProductService.create: ${error.message}`);
        }
    }

    // Actualizar producto
    update = async (id, productData) => {
        try {
            const { name, price, description, stock, active } = productData;

            // Creamos un nuevo objeto solo con lo que viene (evitando undefined)
            const cleanData = {
                ...(name && { name }),
                ...(price && { price }),
                ...(description && { description }),
                ...(stock !== undefined && { stock }),
                ...(active !== undefined && { active })
            };

            return await productRepository.update(id, cleanData);
        } catch (error) {
            throw new Error(`Error en ProductService.update: ${error.message}`);
        }
    }

    // Borrado lógico
    delete = async (id) => {
        try {
            return await productRepository.delete(id);
        } catch (error) {
            throw new Error(`Error en ProductService.delete: ${error.message}`);
        }
    }
}

export const productService = new ProductService(); 