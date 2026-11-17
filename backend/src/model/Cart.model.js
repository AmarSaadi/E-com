import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity:{
        type: Number,
        required: true,
        default: 1,
        min: [1, "Quantity cannot be less than 1"]
    },
    priceAtAdd:{
        type: Number,
        required: true
    },
});

const CartModel = mongoose.model("Cart", cartSchema);
export default CartModel;