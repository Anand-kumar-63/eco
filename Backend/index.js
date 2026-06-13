    import dotenv from "dotenv";
    dotenv.config(); // ✅ Must be first before any module reads process.env

    import express from "express";
    import cors from "cors";
    import connectDB from "./database/Dbconnect.js";
    import router from "./routes/userRoutes.js";
    import productRouter from "./routes/productRoutes.js";
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    const PORT = process.env.PORT || 5000;
    app.use("/api/auth",router);
    app.use("/api/product",productRouter);
    app.get("/", (req, res) => {
        res.send("hey the server is working");
    });
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`server is running on the port: ${PORT}`);
        });
    }).catch((err)=>{
           console.log("server connection Error",err.Message);
    })
