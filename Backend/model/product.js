import mongoose from "mongoose"
import mnogoose, { mongo } from "mongoose"
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    reviews: {
        type: Number,
        default: 0
    },
    imageURl: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    stock:{
        type:Number,
        default:0
    },
    rating: {
        
        type: Number,
        default: 0
    }

})
const Productmodel = mongoose.model("Product", productSchema);
export default Productmodel;