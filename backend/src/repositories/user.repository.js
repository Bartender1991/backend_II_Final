import { userDao } from "../daos/index.js";
import UserDTO from '../dto/user.dto.js';
import BaseRepository from "./base.repository.js";

class UserRepository extends BaseRepository {
    constructor(dao) {
        super(dao)
    }

    getUserById = async (id) => {
        try {
            const user = await this.dao.getById(id);
            // Si no existe el usuario, retornamos null
            if (!user) return null;

            // Retornamos el objeto filtrado por el DTO
            return new UserDTO(user);
        } catch (error) {
            throw new Error(error);
        }
    }
    addOrderToUser = async (userId, orderId) => {
        try {
            return await this.dao.update(userId, orderId)
        } catch (error) {
            throw new Error(error);
        }
    }

    getUserByEmail = async (email) => {
        try {
            const user = await this.dao.getByEmail(email);
            if (!user) return null;
            return new UserDTO(user);
        } catch (error) {
            throw new Error(`Error en Repository getUserByEmail: ${error.message}`);
        }
    }

    getUserWithPassword = async (email) => {
        try {
            return await this.dao.getByEmail(email);
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const userRepository = new UserRepository(userDao);