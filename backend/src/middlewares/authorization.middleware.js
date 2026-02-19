export const authorization = (roles) => { 
    return async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).send({
                    status: "error",
                    error: "No autorizado: Usuario no encontrado en la petición"
                });
            }

            
            const rolesArray = Array.isArray(roles) ? roles : [roles];

            if (!rolesArray.includes(req.user.role)) {
                return res.status(403).send({
                    status: "error",
                    error: "No tienes permisos suficientes para acceder a este recurso"
                });
            }

            next();
        } catch (error) {
            res.status(500).send({
                status: "error",
                error: `Error en autorización: ${error.message}`
            });
        }
    }
}