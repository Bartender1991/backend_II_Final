import { userRepository } from "../repositories/user.repository.js";
import { createHash } from "../utils/hashFunctions.js";
import { isValidPassword } from "../utils/hashFunctions.js";
import { cartService } from "./cart.service.js";

class UserService {
    getUserById = async (id) => {
        try {
            const user = await userRepository.getUserById(id);
            if (!user) throw new Error("Usuario no encontrado");
            return user;
        } catch (error) {
            throw new Error(`UserService Error: ${error.message}`);
        }
    }

    getUserByEmail = async (email) => {
        try {
            const user = await userRepository.getUserByEmail(email);
            return user; // Puede ser null si no existe
        } catch (error) {
            throw new Error(`UserService Error: ${error.message}`);
        }
    }

    getUserWithPassword = async (email) => {
        try {
            return await userRepository.getUserWithPassword(email);
        } catch (error) {
            throw new Error(`UserService Error: ${error.message}`);
        }
    }

    loginUser = async (email, password) => {
        try {
            const user = await userRepository.getUserWithPassword(email);
            if (!user) throw new Error("Credenciales inválidas");

            const isPasswordValid = isValidPassword(user, password);
            if (!isPasswordValid) throw new Error("Credenciales invalidas");

            return user;
        } catch (error) {
            throw new Error(`UserService Login Error: ${error.message}`);
        }
    }

    register = async (userData) => {
        try {
            const { first_name, last_name, email, age, password, role = 'user' } = userData;

            if (!first_name || !last_name || !email || !password) {
                throw new Error("Faltan campos obligatorios para el registro");
            }

            const existingUser = await userRepository.getUserByEmail(email);
            if (existingUser) throw new Error("El email ya está registrado");

            const newCart = await cartService.create();

            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password),
                role,
                cart: newCart._id,
                active: true
            };

            return await userRepository.create(newUser);
        } catch (error) {
            throw new Error(`UserService Register Error: ${error.message}`);
        }
    }

    updateUserPassword = async (uid, hashedPassword) => {
        try {
            // Usamos el userRepository que ya tenés importado ahí
            // y el método update que viene del MongoDao
            return await userRepository.update(uid, { password: hashedPassword });
        } catch (error) {
            throw new Error(`UserService Update Error: ${error.message}`);
        }
    }
}

export const userService = new UserService();