import nodemailer from 'nodemailer';
import config from '../config/index.js';

class MailService {
    constructor() {
        // Configuramos el transporte con tus datos de Gmail
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: config.EMAIL,
                pass: config.EMAIL_PASS
            }
        });
    }

    sendResetMail = async (email, token) => {
        try {
            // Este es el link que el usuario verá en su correo
            const resetLink = `http://localhost:8080/api/auth/reset-password?token=${token}`;

            const mailOptions = {
                from: `Ecommerce Omar <${config.MAIL_USER}>`,
                to: email,
                subject: 'Restablecer contraseña - Ecommerce Omar',
                html: `
                    <div style="font-family: sans-serif; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
                        <h2 style="color: #333;">¿Olvidaste tu contraseña?</h2>
                        <p>No te preocupes, suele pasar. Haz clic en el botón de abajo para crear una nueva:</p>
                        <a href="${resetLink}" 
                           style="display: inline-block; background-color: #007bff; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; margin: 20px 0;">
                           Restablecer mi contraseña
                        </a>
                        <p style="font-size: 0.8em; color: #777;">Este enlace expirará automáticamente en 1 hora por tu seguridad.</p>
                    </div>
                `
            };

            return await this.transporter.sendMail(mailOptions);
        } catch (error) {
            throw new Error(`Error al enviar el email: ${error.message}`);
        }
    }
}

export const mailService = new MailService();