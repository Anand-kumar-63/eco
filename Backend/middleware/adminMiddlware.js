import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
const adminMiddleware = async(req,res,next) => {
    if(req.user && req.user.role == 'admin'){
        console.log("yes")
        next();
    } 
    else{
        return res.status(200).json({message:"Not authorised"})
    }
}
export default adminMiddleware