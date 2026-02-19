// Importamos el DAO genérico para MongoDB, este DAO contiene los métodos comunes (create, getAll, etc.)
import MongoDao from "./MongoDao.js";

// Importamos el modelo de productos de Mongoose, este modelo representa la colección "products" en MongoDB
import { ProductModel } from "./models/product.model.js";

// Creamos una clase específica para productos
// Extiende del DAO genérico para reutilizar la lógica común
class ProductMongoDao extends MongoDao {

    // Constructor de la clase, recibe el modelo y lo pasa al constructor del padre (MongoDao)
    constructor(model) {
        super(model)
    }

    // Método específico de productos

    // Busca un producto por nombre que esté activo
    getByname = async (name) => {
        try {
            return await this.model.findOne({ name, active: true })
        } catch (error) {
            throw new Error(error)
        }
    }
}

// Creamos y exportamos una instancia del DAO de productos
// Se inyecta el ProductModel para que el DAO sepa qué colección usar
export const productMongoDao = new ProductMongoDao(ProductModel);
