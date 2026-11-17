import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity must be at least 1"]
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price must be a positive number"]
    },
    description:{
        type:String,
        required:[true,"Please Enter Order Description"]
    },
    image: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
})
const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;