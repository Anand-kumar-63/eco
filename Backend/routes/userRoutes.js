import express from "express"
import { userLogin , userSignup , getUser, getUsers } from "../controller/authController.js";
import userMiddleware from "../middleware/userMiddleware.js";
import adminMiddlware from "../middleware/adminMiddlware.js";
const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/user", userMiddleware , getUser);
router.get("/users", userMiddleware , adminMiddlware , getUsers);
// router.post("/verify-email",)
// router.post("/update" , userUpdate);
export default router;