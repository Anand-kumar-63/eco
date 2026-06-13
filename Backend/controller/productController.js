import Productmodel from "../model/product.js";
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

// Helper: upload buffer to Cloudinary via stream
// cloudinary.config() is called here (lazily) so that dotenv has already
// populated process.env before this runs — ES module imports are hoisted
// so top-level config() would fire before dotenv.config() in index.js.
const uploadToCloudinary = (buffer) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {folder: 'products'},
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        streamifier.createReadStream(buffer).pipe(stream);
    });
};

export const getProducts = async (req, res, next) => {
    try {
        const products = await Productmodel.find({});
        return res.status(200).json(products);
    } catch (error) {
        return res.status(400).json({ message: "Products cannot be fetched", error });
    }
}

export const getProduct = async (req, res) => {
    const { Id } = req.params;
    try {
        const product = await Productmodel.findById(Id);
        if (!product) {
            return res.status(400).json({ message: "No product exist for this Id" });
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(400).send(error);
    }
}

export const createProducts = async (req, res) => {
    const { name, description, price, category, reviews, stock } = req.body;
    if (!name || !description || !price || !category || !reviews || !stock) {
        return res.status(402).json({ message: "Invalid details" });
    }
    let imageURl = "";
    try {
        if (req.file) {
            // Upload via in-memory buffer — no disk path issues
            const source = await uploadToCloudinary(req.file.buffer);
            console.log("Cloudinary Response:", source);
            imageURl = source.secure_url;
        }
        const productdata = {
            name, description, price, category, reviews, stock,
            imageURl
        };
        const product = await Productmodel.create(productdata);
        console.log(product);
        return res.status(200).json(product);
    } catch (error) {
        console.error("CLOUDINARY ERROR:", error);
        return res.status(500).json({
            message: error.message
        });
    }
}

export const updateProduct = async (req, res) => {
    const { name, description, price, category, reviews, stock } = req.body;
    try {
        const product = await Productmodel.findById(req.params.Id);
        if (product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.category = category || product.category;
            product.reviews = reviews || product.reviews;
            product.stock = stock || product.stock;
            if (req.file) {
                const source = await uploadToCloudinary(req.file.buffer);
                product.imageURl = source.secure_url;
            }
            const updatedProduct = await product.save();
            return res.status(200).json({ messgae: "product updated succesfullly", updatedProduct });
        } else {
            return res.status(401).json({ message: "Product Doesn't Exist" });
        }
    }
    catch (error) {
        return res.status(400).json({ message: "Product update failed", error });
    }
}
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.Id);
        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};