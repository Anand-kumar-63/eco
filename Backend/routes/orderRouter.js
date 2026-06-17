import express from "express";
import userAuthentciation from "../middleware/userMiddleware.js";
import { createOrder , getMyOrder , getOrders , deleteOrderbyId , updateOrderstatus } from "../controller/ordercontroller.js";
import adminMiddlware from "../middleware/adminMiddlware.js";
import multer from "multer";
const uplaod = multer();
const orderRouter = express.Router();

orderRouter.post("/" , userAuthentciation ,createOrder);
orderRouter.get("/:Id", userAuthentciation , adminMiddlware , getOrders ); // all orders can be fetched by admin only
orderRouter.get("/" , userAuthentciation , getMyOrder);
orderRouter.post("/delete/:Id", userAuthentciation , deleteOrderbyId);
orderRouter.post("/status/:Id", userAuthentciation , updateOrderstatus);

export default orderRouter;
