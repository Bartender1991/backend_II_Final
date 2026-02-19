import { productDao } from "../daos/index.js"; // Importamos desde el factory
import BaseRepository from "./base.repository.js";

class ProductRepository extends BaseRepository {
    constructor(dao) {
        super(dao);
    }

    // Método específico si necesitás buscar por nombre
    getProductByName = async (name) => {
        try {
            return await this.dao.getByname(name);
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const productRepository = new ProductRepository(productDao);