import { resetTokenMongoDao } from "../daos/mongodb/resetToken.dao.js";
import { ResetTokenModel } from "../daos/mongodb/models/resetToken.model.js";

class ResetTokenRepository {
    constructor() {
        this.dao = resetTokenMongoDao;
    }

    createToken = async (email, token) => {
        return await this.dao.create({ email, token });
    }

   getToken = async (token) => {
        return await this.dao.findOne({ token });
    }

    deleteToken = async (id) => {
        return await ResetTokenModel.findByIdAndDelete(id);
    }
}

export const resetTokenRepository = new ResetTokenRepository();