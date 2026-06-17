import express from "express";
import userAuthentciation from "../middleware/userMiddleware";
import adminMiddleware from "../middleware/adminMiddlware";
import { checkAdminstats } from "../controller/analyticsController";
const analyticsRouter = express.Router();
analyticsRouter.get("/",userAuthentciation,adminMiddleware,checkAdminstats);
export const analyticsRouter;