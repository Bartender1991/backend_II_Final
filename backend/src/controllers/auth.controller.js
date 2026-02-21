import jwt from "jsonwebtoken";
import config from "../config/index.js";
import UserDTO from "../dto/user.dto.js";
import * as crypto from 'crypto';
import { mailService } from "../services/mail.service.js";
import { userService } from "../services/user.service.js";
import { resetTokenRepository } from "../repositories/resetToken.repository.js";
import { createHash, isValidPassword } from "../utils/hashFunctions.js";

class AuthController {
    login = async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await userService.loginUser(email, password);

            const userDTO = new UserDTO(user);

            const token = jwt.sign(
                {
                    email: user.email,
                    role: user.role,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    cart: user.cart
                },
                config.JWT,
                { expiresIn: "24h" }
            );

            return res.cookie("coderCookieToken", token, {
                maxAge: 60 * 60 * 1000 * 24, // 24hs
                httpOnly: true
            }).send({ status: "success", message: "Login exitoso", payload: userDTO });

        } catch (error) {
            return res.status(401).send({ status: "error", message: error.message });
        }
    }

    current = async (req, res) => {
        try {
            const userClear = new UserDTO(req.user);
            return res.send({ status: "success", payload: userClear });
        } catch (error) {
            return res.status(500).send({ status: "error", message: error.message });
        }
    }

    register = async (req, res) => {
        try {
            const user = await userService.register(req.body);

            return res.status(201).send({
                status: "success",
                message: "Usuario registrado con éxito",
                payload: user
            });
        } catch (error) {
            return res.status(400).send({
                status: "error",
                message: error.message
            });
        }
    }

    requestPasswordReset = async (req, res) => {
        try {
            if (!req.body?.email) {
                return res.status(400).send({
                    status: "error",
                    message: "Falta el campo 'email' en el cuerpo de la petición."
                });
            }

            const { email } = req.body;

            const user = await userService.getUserByEmail(email);
            if (!user) {
                return res.status(404).send({ status: "error", message: "Usuario no encontrado" });
            }

            const token = crypto.randomBytes(20).toString('hex');

            await resetTokenRepository.createToken(email, token);

            await mailService.sendResetMail(email, token);

            res.send({ status: "success", message: "Correo de recuperación enviado con éxito" });

        } catch (error) {
            res.status(500).send({
                status: "error",
                message: `Error en el proceso de recuperación: ${error.message}`
            });
        }
    }

    resetPassword = async (req, res) => {
        try {
            const { token, newPassword } = req.body;

            // 1. Buscamos el token usando el Repository
            const tokenData = await resetTokenRepository.getToken(token)

            if (!tokenData) {
                return res.status(400).send({
                    status: "error",
                    message: "El enlace es inválido o ha expirado. Por favor, solicita uno nuevo."
                });
            }

            // 2. Buscamos al usuario asociado al token
            const user = await userService.getUserWithPassword(tokenData.email);
            if (!user) return res.status(404).send({
                status: "error",
                message: "Usuario no encontrado"
            });

            // 3. Usamos tu función isValidPassword (que compara contra el hash)
            if (isValidPassword(user, newPassword)) {
                return res.status(400).send({
                    status: "error",
                    message: "No puedes usar la misma contraseña que ya tenías. Por seguridad, elige una distinta."
                });
            }

            // 4. Actualizamos: Hasheamos la nueva y guardamos
            const hashedPassword = createHash(newPassword);
            await userService.updateUserPassword(user._id, hashedPassword);

            // 5. Limpieza: Borramos el token para que no se pueda reutilizar
            await resetTokenRepository.deleteToken(tokenData._id);

            res.send({ status: "success", message: "Contraseña actualizada correctamente" });
        } catch (error) {
            res.status(500).send({ status: "error", message: error.message });
        }
    }
}

export const authController = new AuthController();