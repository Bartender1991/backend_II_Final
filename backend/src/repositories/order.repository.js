import { orderDao } from "../daos/index.js";
import BaseRepository from "./base.repository.js";

class OrderRepository extends BaseRepository {
    constructor(dao) {
        super(dao);
    }

}

export const orderRepository = new OrderRepository(orderDao);