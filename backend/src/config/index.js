export default {
    // Puerto del servidor
    PORT: process.env.PORT,

    // URL final de conexión a MongoDB
    // Se arma concatenando las variables de entorno
    MONGO_URL: `${process.env.MONGO_USER_PASS}/${process.env.MONGO_BASE}?${process.env.MONGO_OPTIONS}`,

    PERSISTENCE: process.env.PERSISTENCE,

    JWT:process.env.JWT_SECRET,
};
