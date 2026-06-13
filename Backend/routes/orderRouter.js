import express from "express";
import userAuthentciation from "../middleware/userMiddleware.js";
import { createOrder , getMyOrder , getOrders , deleteOrderbyId , updateOrderstatus } from "../controller/ordercontroller.js";
import adminMiddlware from "../middleware/adminMiddlware.js";
const orderRouter = express.Router();

orderRouter.post("/" , userAuthentciation , createOrder);
orderRouter.get("/:Id", userAuthentciation , getOrders );
orderRouter.get("/" , userAuthentciation ,adminMiddlware , getMyOrder);
orderRouter.post("/delete/:Id", userAuthentciation , deleteOrderbyId);
orderRouter.post("/status/:Id", userAuthentciation , updateOrderstatus);

export default orderRouter;
