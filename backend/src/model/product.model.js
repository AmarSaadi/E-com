import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productName :{
        type:String,
        required:[true,"Please Enter Product Name"],

    },
    description:{
        type:String,
        required:[true,"Please Enter Product Description"],
    },
    price:{
        type:Number,
        required:[true,"Please Enter Product Price"],
    },
    category:{
        type: mongoose.Schema.ObjectId,
        ref:"Category",
        required:true
    },
    stoke:{
        type:Number,
        required:true,
        default:0
    },
    image:{
        type:String,
        required:[true,"Please Enter Product Image"]
    },
    createBy:{
        type :mongoose.Schema.ObjectId,
        ref:"User"
    }
})
const productModel = mongoose.model("Product",productSchema);
export default productModel;