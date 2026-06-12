import mongoose from "mongoose";
async function connectDB(){
    try{
     await mongoose.connect(process.env.MONGODB_URI);
     console.log("Mongodb connected succesfully");
    }
    catch(error){
        console.error("mongodb connection failed: " , error.Message);
        process.exit(1);
    }
}
export default connectDB;