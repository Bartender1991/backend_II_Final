import passport from 'passport';

export const passportCall = (strategy) => {
    return async (req, res, next) => {
        // Ejecutamos la estrategia (en nuestro caso 'jwt')
        passport.authenticate(strategy, function (err, user, info) {
            if (err) return next(err);

            if (!user) {
                return res.status(401)
                    .send({
                        status: "error",
                        error: info.messages ? info.messages : info.toString()
                    });
            }

            // Si todo está ok, metemos al usuario en el objeto req
            req.user = user;
            next();
        })(req, res, next);
    }
}