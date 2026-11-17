import categoryModel from "../model/category.model.js";
import productModel from "../model/product.model.js";
import storageService from "../services/storage.service.js";

async function getAllProducts(req, res) {
    try {
        const products = await productModel.find().populate('category', 'name').sort({ _id: -1 });
        return res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

async function productUpload(req, res) {
    try {
    const { productName, description, price, category, stoke } = req.body;

    if (!productName || !description || !price || !category) {
        return res.status(400).json({
            message: "name, description, price, and category are required"
        });
    }

    const categoryCheck = await categoryModel.findById(category);
    if (!categoryCheck) {
        return res.status(400).json({ message: "Invalid Category" });
    }

    const file = req.file || req.files?.[0];
    if (!file?.buffer) {
        return res.status(400).json({
            message: "Image file is required. Please upload a file using the 'image' field."
        });
    }

    const result = await storageService.uploadFile(file.buffer.toString("base64"));
    const imageUrl = result?.url || result;

    const newProduct = await productModel.create({
        productName,
        description,
        price,
        image: imageUrl,
        category,
        stoke: stoke || 0,
        createBy: req.user._id
    });

    return res.status(201).json({ message: "Product created successfully", product: newProduct });
    }catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
 }
}

export default { getAllProducts, productUpload };