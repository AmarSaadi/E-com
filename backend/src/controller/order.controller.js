import mongoose from "mongoose";
import orderModel from "../model/order.model.js";
import productModel from "../model/product.model.js";
import userModel from "../model/user.model.js";

async function createOrder(req, res) {
    try {
        const { productId,userId } = req.body;

        if(!mongoose.Types.ObjectId.isValid(productId) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid productId or userId" });
        }

        // Check if the product exists
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product Not Found" });
        }
        console.log(productId,);
        // Check if the user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(user);

        // Create the order
        const order = await orderModel.create({
            productId,
            name: product.productName,
            quantity: req.body.quantity ?? 1,
            price: product.price,
            description: product.description,
            image: product.image,
            userId
        });
        return res.status(201).json({ message: "Order created successfully", order });
    }catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
export default { createOrder };

