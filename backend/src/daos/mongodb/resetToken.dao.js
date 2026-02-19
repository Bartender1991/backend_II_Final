import MongoDao from "./MongoDao.js";
import { ResetTokenModel } from "./models/resetToken.model.js";

class ResetTokenMongoDao extends MongoDao {
    constructor() {
        super(ResetTokenModel);
    }

    findByToken = async (token) => {
        return await ResetTokenModel.findOne({ token });
    }
    findOne = async (filter) => {
        try {
            return await this.model.findOne(filter);
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const resetTokenMongoDao = new ResetTokenMongoDao();