export default class BaseRepository {
    constructor(dao) {
        this.dao = dao;
    }


    // Método para obtener todos los documentos de la colección
    getAll = async () => {
        try {
            return await this.dao.getAll();

        } catch (error) {
            // Capturamos cualquier error ocurrido en la consulta
            throw new Error(error)
        }
    }

    // Método para obtener un documento por su ID
    getById = async (id) => {
        try {
            return await this.dao.getById(id);

        } catch (error) {
            // Si el ID no existe o hay un error en la consulta
            throw new Error(error)
        }
    }
   
    // Método para crear un nuevo documento en la colección
    create = async (body) => {
        try {
            return await this.dao.create(body)

        } catch (error) {
            // En caso de error, lanzamos una nueva excepción, esto permite que el error suba a la capa superior (service / controller)
             throw new Error(`Repository create error: ${error.message}`);
        }
    }

    // Método para actualizar un documento existente
    update = async (id, body) => {
        try {
            return await this.dao.update(id, body)

        } catch (error) {
            // Manejo del error si falla la actualización
            throw new Error(error)
        }
    }

    // Método para eliminar un documento de la colección
    delete = async (id) => {
        try {
            // return await this.model.findByIdAndDelete(id)
            return await this.dao.delete(id);
        } catch (error) {
            // Si ocurre un error al eliminar el documento
            throw new Error(error)
        }
    }
}

