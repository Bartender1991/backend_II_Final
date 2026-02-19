// Importamos el DAO genérico para MongoDB, este DAO contiene los métodos comunes (create, getAll, etc.)
import MongoDao from "./MongoDao.js";

// Importamos el modelo de productos de Mongoose, este modelo representa la colección "products" en MongoDB
import { CartModel } from "./models/cart.model.js";

// Extiende del DAO genérico para reutilizar la lógica común

class CartMongoDao extends MongoDao {

    // Constructor de la clase, recibe el modelo y lo pasa al constructor del padre (MongoDao)
    constructor(model) {
        super(model)
    }

    // Sobrescribimos el método del padre para que no busque el campo "active"
    getById = async (id) => {
        try {
            return await this.model.findById(id).populate('products.product');
        } catch (error) {
            throw new Error(error);
        }
    }

}


export const cartMongoDao = new CartMongoDao(CartModel);
