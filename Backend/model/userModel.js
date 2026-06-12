import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        unique:true
    },
    role:{
        type:String,
        enum:["Admin","User"],
        default:"User"
    }
})
const userModel = mongoose.model("User",userSchema);
export default userModel;