import { uploadImage } from "../libs/cloudinary.js";
import MarketplaceModel from "../models/marketplace.model.js";
import { onError } from "../utils/onError.js";

export const createProduct = async (req, res) => {
  try {
    const { name, price, contact, description, image, category, vendorType } = req.body;
    const { id } = req.user;
    if (!name || !price || !contact || !description || !image || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const whatsappNumberLink = `https://wa.me/${contact.replace(/\D/g, "")}`;
    const { url: imageUrl } = await uploadImage(image);
    const product = await MarketplaceModel.create({
      name,
      price,
      contact: whatsappNumberLink,
      description,
      image: imageUrl,
      category,
      createdBy: id,
      vendorType,
    });
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await MarketplaceModel.find().sort({ createdAt: -1 }).populate("createdBy");
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await MarketplaceModel.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    onError(res, error);
  }
};
