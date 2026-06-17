import paymentModel from "../model/payment.js"
import Razorpay from "razorpay";
import OrderModel from "../model/orderModel.js";
export const createPayment = async (req, res, next) => {
    try {
        const {}
        var instance = new Razorpay({
            key_id: process.env.RAZORPAY_API_KEY,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
        const order = await OrderModel.find

        var options = {
            amount: 50000,  // Amount is in currency subunits. 
            currency: "INR",
            receipt: "order_rcptid_11"
        };
    }
    catch (error) {

    }
}

export const checkPaymentstatus = async (req, res) => {
    try {

    }
    catch (error) {

    }
}