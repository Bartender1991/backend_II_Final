import { userService } from "../services/user.service.js";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import UserDTO from "../dto/user.dto.js";

class AuthController {
    login = async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await userService.loginUser(email, password);

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
            }).send({ status: "success", message: "Login exitoso", payload: user });

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
}

export const authController = new AuthController();