// Importamos el DAO genérico para MongoDB, este DAO contiene los métodos comunes (create, getAll, etc.)
import MongoDao from "./MongoDao.js";

// Importamos el modelo de productos de Mongoose, este modelo representa la colección "products" en MongoDB
import { UserModel } from "./models/user.model.js";

// Extiende del DAO genérico para reutilizar la lógica común

class UserMongoDao extends MongoDao {

    // Constructor de la clase, recibe el modelo y lo pasa al constructor del padre (MongoDao)
    constructor(model) {
        super(model)
    }
    addOrderToUser = async (userId, orderId) => {
        try {
            return await this.model.findByIdAndUpdate(
                userId,
                { $push: { orders: orderId } }, // Usamos 'orders' para que coincida con el modelo
                { new: true }
            );
        } catch (error) {
            throw new Error(error);
        }
    }
    
    // Método para buscar por email (lo usaremos en login y recuperación de clave)
    getByEmail = async (email) => {
        try {
            return await this.model.findOne({ email });
        } catch (error) {
            throw new Error(error);
        }
    }
}


export const userMongoDao = new UserMongoDao(UserModel);
