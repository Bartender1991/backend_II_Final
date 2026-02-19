import bcrypt from "bcrypt";

// encriptar contraseña
export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// validar contraseña
export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
};