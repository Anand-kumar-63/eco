    import express from "express";
    import cors from "cors";
    import dotenv from "dotenv";
    import connectDB from "./database/Dbconnect.js";
    import router from "./routes/userRoutes.js";
    import productRouter from "./routes/productRoutes.js";
    import multer from "multer";
    const upload = multer({dest:"./uploads"})
    
    dotenv.config();
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    const PORT = process.env.PORT || 5000;







    app.post("/multer",upload.single("file"),(req,res)=>{
         return res.status(200).send("file uploaded successfully");
    })
    
    app.use("/api/auth",router);
    app.use("/api/product",router);
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
