import express from "express"
import { userLogin , userSignup , getUser } from "../controller/authController.js";
const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/get", getUser);

// router.post("/update" , userUpdate);
export default router;