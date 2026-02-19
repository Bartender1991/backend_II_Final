import BaseRepository from "./base.repository.js";
import { cartDao } from "../daos/index.js"; 

class CartRepository extends BaseRepository {
    constructor(dao) {
        super(dao);
    }

    // Aquí podés agregar métodos específicos como vaciar carrito o calcular total
    getCartWithProducts = async (id) => {
        try {
            // Recordá que tu CartDao ya tiene el populate en su getById
            return await this.dao.getById(id);
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const cartRepository = new CartRepository(cartDao);