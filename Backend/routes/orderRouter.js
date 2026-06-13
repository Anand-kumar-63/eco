import express from "express";
import userAuthentciation from "../middleware/userMiddleware";
import { createOrder , getorderById , getOrders , deleteOrderbyId , updateOrderstatus } from "../controller/ordercontroller";
import adminMiddlware from "../middleware/adminMiddlware";
const orderRouter = express.Router();

orderRouter.post("/" , userAuthentciation , createOrder);
orderRouter.get("/:Id", userAuthentciation , getorderById);
orderRouter.get("/" , userAuthentciation ,adminMiddlware , getOrders);
orderRouter.post("/delete/:Id", userAuthentciation , deleteOrderbyId);
orderRouter.post("/status/:Id", userAuthentciation , updateOrderstatus);

export default orderRouter;
