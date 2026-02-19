// Esta clase funcionará como DAO genérico para MongoDB
export default class MongoDao {

    // Constructor de la clase
    // Recibe un modelo de Mongoose (por ejemplo UserModel, ProductModel, etc.)
    constructor(model) {
        // Guardamos el modelo para usarlo en todos los métodos
        this.model = model;
    }

    // Método para crear un nuevo documento en la colección
    create = async (body) => {
        try {
            return await this.model.create(body)

        } catch (error) {
            // En caso de error, lanzamos una nueva excepción, esto permite que el error suba a la capa superior (service / controller)
            throw new Error(error)
        }
    }

    // Método para obtener todos los documentos de la colección
    getAll = async () => {
        try {
            return await this.model.find({ active: true })

        } catch (error) {
            // Capturamos cualquier error ocurrido en la consulta
            throw new Error(error)
        }
    }

    // Método para obtener un documento por su ID
    getById = async (_id) => {
        try {
            return await this.model.findOne({ _id, active: true })

        } catch (error) {
            // Si el ID no existe o hay un error en la consulta
            throw new Error(error)
        }
    }

    // Método para actualizar un documento existente
    update = async (id, body) => {
        try {
            return await this.model.findByIdAndUpdate(id, body, { new: true })

        } catch (error) {
            // Manejo del error si falla la actualización
            throw new Error(error)
        }
    }

    // Método para eliminar un documento de la colección
    delete = async (id) => {
        try {
            // return await this.model.findByIdAndDelete(id)
            return await this.model.findByIdAndUpdate(
                id,
                { active: false },
                { new: true })


        } catch (error) {
            // Si ocurre un error al eliminar el documento
            throw new Error(error)
        }
    }
}
