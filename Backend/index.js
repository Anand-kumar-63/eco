    import express from "express";
    import cors from "cors";
    import dotenv from "dotenv";
    import connectDB from "./database/Dbconnect.js";
    import router from "./routes/userRoutes.js";
    dotenv.config();
    const app = express();
    app.use(cors());
    app.use(express.json());
    const PORT = process.env.PORT || 5000;

    app.use("/api/auth",router);
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
