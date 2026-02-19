import express from 'express';
import './daos/index.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import authRouter from './routes/auth.router.js';
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import orderRouter from './routes/order.router.js';
import config from "./config/index.js";

const app = express();

const iniciarApp = async () => {
    try {

        //Middlewares de configuración
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cookieParser()); // Vital para leer la cookie con el JWT

        //Configuración de Passport
        initializePassport();
        app.use(passport.initialize());

        //Definición de Rutas
        app.use('/api/auth', authRouter);       // Maneja login y current
        app.use('/api/products', productRouter); // Maneja stock y catálogo
        app.use('/api/carts', cartRouter);       // Maneja carritos y la compra (purchase)
        app.use('/api/orders', orderRouter);     // Maneja el historial de ventas

        //Middleware de manejo de errores global
        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send({ status: "error", error: "Algo salió mal en el servidor" });
        });

        app.listen(config.PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${config.PORT}`);
            console.log(`✅ Base de Datos conectada y Capas listas`);
        });

    } catch (error) {
        console.error('❌ Error crítico al iniciar la aplicación:', error);
        process.exit(1);
    }
};

iniciarApp();