import OrderModel from "../model/orderModel.js";
import userModel from "../model/userModel.js";
import orderRouter from "../routes/orderRouter.js";
import sendemail from "../utils/sendemail.js";

export const createOrder = async (req, res, next) => {
    try {
        const { items, totalAmount, address, PaymentId } = req.body;
        if (items.length == 0 || !totalAmount || !address || !PaymentId) {
            return res.status(400).json({ message: "Invalid values" });
        }
        const userObject = {
            userId: req.user._id,
            items,
            totalAmount,
            address,
            PaymentId
        }
        const neworder = await OrderModel.create(userObject);
        const message = `Dear ${req.user} you order created succesfulyy`;
        await sendemail(req.user.email, "order created", message);
        return res.status(200).json({ message: "Order created successfully", neworder })
    }
    catch (error) {
        console.log("Error", error.message);
        return res.status(400).json({ message: "Internal server error", })
    }
}
export const getOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find({}).populate("userId", 'id name');
        return res.status(200).send(orders);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export const updateOrderstatus = async (req, res) => {
    try {
        const order = await OrderModel.findById(req.params.Id);
        if (order) {
            order.status = req.body.status || order.status
            const updatedOrder = await order.save();
            return res.status(200).json(updatedOrder);
        }
    }
    catch (error) {
        return res.status(400).send(error.message);
    }
}

export const getMyOrder = async (req, res) => {
    try {
        const order = await OrderModel.find({ userId: req.user._id });
        return res.status(200).send(order);
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
}

export const deleteOrderbyId = async (req, res) => {
    try {
        const deleteorder = await OrderModel.deleteOrderbyId(req.params.Id);
        return res.send("order deleted");
    }
    catch (error) {
        return res.status(400).send(error.message);
    }
}
