import Productmodel from "../model/product.js";
import cloudinary from "cloudinary";

export const getProducts = async (req, res, next) => {
    try {
        const products = await Productmodel.find({});
        return res.status(200).json(products);
    } catch (error) {
        return res.status(400).json({ message: "Products cannot be fetched", error });
    }
}
export const getProduct = async (req, res) => {
    const { Id } = req.body;
    try {
        const product = await Productmodel.findOne({ Id });
        if (!product) {
            return res.status(400).json({ message: "No product exist for this Id" });
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(400).send(error);
    }
}

export const createProducts = async (req, res) => {
    const { name, description, price, category, reviews } = req.body;

    if(!name || !description ||!price || !category ||!reviews){
        return res.status(402).json({message:"Invalid details"});
    }
    let ImageURL = " ";
    try {
        if (req.file) {
            const source = await cloudinary.uploader.upload(req.file.path);
            ImageURL = source.secure_url;
        }
        const productdata = {
            name, description, price, category, reviews, imageURL
        }
        const product = await Productmodel.create(productdata);
        return res.status(200).json(product);
    } catch (error) {

    }
}

export const updateProduct = async(req,res)=>{
   const { name , description , price , category , reviews  } = req.body;
   try{
       
  }
  catch(error){
    return res.status(400).json({ message:"Product update failed",error});
  }
}

export const deleteProduct = async(req,res)=>{
  try{

  }catch(error){

  }
}