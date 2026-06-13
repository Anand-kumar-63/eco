import userAuthentciation from "../middleware/userMiddleware.js";
import adminMiddlware from "../middleware/adminMiddlware.js";
import { createProducts , getProduct , updateProduct , deleteProduct, getProducts } from "../controller/productController.js";
import expess from "express";
import multer from "multer";
const productRouter = expess.Router();
const upload =  multer({dest:"./uploads"});

productRouter.post("/" , userAuthentciation , adminMiddlware , upload.single('image') , createProducts);
productRouter.get("/:Id", userAuthentciation , getProduct );
productRouter.get("/products", userAuthentciation ,adminMiddlware , getProducts);
productRouter.post("/update/:Id", userAuthentciation, upload.single('image') , updateProduct);
productRouter.post("/delete/:Id", userAuthentciation , adminMiddlware  , deleteProduct);

export default productRouter;