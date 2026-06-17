import express from "express";
import userAuthentciation from "../middleware/userMiddleware.js";
import adminMiddleware from "../middleware/adminMiddlware.js";
import { checkAdminstats } from "../controller/analyticsController.js";
const analyticsRouter = express.Router();

analyticsRouter.get("/",userAuthentciation,adminMiddleware,checkAdminstats);

export default analyticsRouter;