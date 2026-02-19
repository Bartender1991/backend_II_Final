// import { productFSDao } from "./filesystem/product-dao.js";
import { initMongoDB } from "./mongodb/connection.js";
import { productMongoDao } from "./mongodb/product.dao.js";
import { userMongoDao } from "./mongodb/user.dao.js";
import { cartMongoDao } from "./mongodb/cart.dao.js";
import { ticketMongoDao } from "./mongodb/ticket.dao.js";
import { orderMongoDao } from "./mongodb/order.dao.js";
import config from "../config/index.js";


let productDao;
let userDao;
let cartDao;
let ticketDao;
let orderDao;

const PERSISTENCE = config.PERSISTENCE

switch (PERSISTENCE) {
    case "MONGODB":
        initMongoDB()
            .then(() => console.log("Connected to MongoDB"))
            .catch((err) => console.error("Failed to connect to MongoDB", err));
        productDao = productMongoDao;
        userDao = userMongoDao;
        cartDao = cartMongoDao;
        ticketDao = ticketMongoDao;
        orderDao = orderMongoDao;
        break;

    // case "FILESYSTEM":
    //     productDao = productFSDao;
    //     break;

    default:
        break;
}


export {
    productDao,
    userDao,
    cartDao,
    ticketDao,
    orderDao
}