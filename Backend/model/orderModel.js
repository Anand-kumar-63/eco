import mongoose from "mongoose";
const orrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true, min: 1 },
            price: { type: Number, required: true }
        }
    ],
    totalAmount: { type: Number, required: true },
    address: {
        fullName: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    PaymentId: { type: String, required: true },
    status:{
        type:String,
        enum:["shipped","delivered","pending"],
        default:"pending"
    }
}, { timestamps: true });

const OrderModel = mongoose.model("Order",orrderSchema);
export default OrderModel;
