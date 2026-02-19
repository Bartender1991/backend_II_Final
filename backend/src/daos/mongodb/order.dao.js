import MongoDao from "./MongoDao.js";
import { OrderModel } from "./models/order.model.js";

class OrderMongoDao extends MongoDao {
    constructor() {
        super(OrderModel);
    }
}

export const orderMongoDao = new OrderMongoDao();