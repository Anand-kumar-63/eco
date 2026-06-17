import express from "express";
import adminMiddleware from "../middleware/adminMiddlware.js";
import userAuthentciation from "../middleware/userMiddleware.js"
import {createPayment , checkPaymentstatus}  from "../controller/paymentController.js";

const paymentRouter = express.Router();
paymentRouter.post("/",userAuthentciation,createPayment);
paymentRouter.get("/:Id",userAuthentciation,checkPaymentstatus);
export default Paymentrouter;
