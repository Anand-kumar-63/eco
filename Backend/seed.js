import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./models/User.js";
import Order from "./models/Order.js";

dotenv.config();

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected");

        // Optional: Clear existing data
        await User.deleteMany({});
        await Order.deleteMany({});

        // Create User
        const user = await User.create({
            name: "Anand Kumar",
            email: "anand@example.com",
            password: "hashedPassword123"
        });

        // Create Order
        const order = await Order.create({
            userId: user._id,
            items: [
                {
                    productId: new mongoose.Types.ObjectId(),
                    name: "iPhone 15",
                    price: 79999,
                    quantity: 1
                },
                {
                    productId: new mongoose.Types.ObjectId(),
                    name: "AirPods Pro",
                    price: 24999,
                    quantity: 1
                }
            ],
            totalAmount: 104998,
            address: {
                fullName: "Anand Kumar",
                street: "123 Main Street",
                city: "Ghaziabad",
                postalCode: "201001",
                country: "India"
            },
            PaymentId: "pay_abc123xyz"
        });

        console.log("User Created:", user._id);
        console.log("Order Created:", order._id);

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedDatabase();