// import { useMemo } from "react";
import userModel from "../model/userModel.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcrypt";
import sendemail from "../utils/sendemail.js";
// signup controller
export const userSignup = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        if(!username || !email || !password){
            return res.status(402).send({ message: "All fields are required" });
        }
        const existinguser = await userModel.findOne({ email });
        if(existinguser){
            return res.status(401).json({ messager: "User `already exist" });}
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newuser = await userModel.create({ 
            username, 
            email, 
            password:hashPassword 
        });
        if(newuser){
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const message = `welcome to test ${username} your otp is ${otp}`;
            // await sendemail(email, 'welcome to shopnest - your OTP for registration', message);
            const userResponse = {
                _id: newuser._id,
                username: newuser.username,
                email: newuser.email
            };
            return res.status(200).json({ message: "User created succesfully" , userResponse , usertoken: generateToken(newuser._id) });
        }
        else{
            return res.status(400).json({ message: "Error in creating user"});
        }
    }
    catch(error){
        console.error(error);
        return res.status(400).json({
            message: "Internal server Error",
            error: error.message
        })} 
}
// login controller 
export const userLogin = async (req, res, next) => {
    const {email , password} = req.body;
    if(!email || !password ){
        return res.status(402).json({message:"All fields are required!"})
    } 
    try{
       const existinguser = await userModel.findOne({email});
       if(!existinguser){
         return res.status(401).json({message:"no user with this email exist"});
       }
       const ismatchedpassed = await bcrypt.compare(password,hashPassword);
       if(!ismatchedpassed){
        return res.status(400).json({message:"Not authorised to access this account"});
       } 
       const token = await generateToken(existinguser._id);
       
       return res.status(200).json({message:"User login successfull", existinguser});
    }
    catch (error) {
        return res.status(400).json({message:"Error "})
    }
}
// update user controller
// export const userUpdate = async (req, res, next) => {
//     const { username , email , } = req.body;
//     try{
//         const Existinguser = await userModel.findOne({email});
//         const updateduser = await userModel.findByIdAndUpdate({
//             email,
//         })
//     }
//     catch(error){
//     }
// }
export const getUser = async (req, res, next) => {
    const { email } = req.body;
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({message:"user doesn't exist"});
        }
        return res.status(200).json({message:"user exist",user});
    }
    catch (error) {
          return res.status(401).json({message:"Internal server error",error});
    }
}
export const getUsers = async()=>{
    try{
     const users = await userModel.find({}).select('-password');
     return res.status(200).json(users)
    } 
    catch(error){
        return res.status(401).json({message:"Internal server Error",error});
    }
}

