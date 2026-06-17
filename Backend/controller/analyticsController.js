import OrderModel from "../model/orderModel.js";
import userModel from "../model/userModel.js";
import Productmodel from "../model/product.js";
import orderRouter from "../routes/orderRouter.js";
export const checkAdminstats = async(req,res)=>{
    try{
         const totalOrders = await OrderModel.count({});
         const totalUser = await userModel.count({role:"user"});
         const totalProduct = await Productmodel.count({});
         const orders = await OrderModel.find({});
         const totalrevenue = orders.reduce((acc , order)=>acc+order.totalAmount , 0)
         res.status(200).json({
            totalOrders,
            totalUser,
            totalProduct,
            totalrevenue
         })
    }    
    catch(error){
        console.error(error.message);
        req.status(401).json({message:"Internal server error"});
    }
} 
