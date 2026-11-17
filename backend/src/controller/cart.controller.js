import ProductModel from "../model/product.model.js";
import CartModel from "../model/Cart.model.js";

async function addToCart(req, res) {
    try {
        const { productId, quantity=1 } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({ message: "Product ID and quantity are required" });
        }

        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const priceAtAdd = product.price;

        const existingCartItem = await CartModel.findOne({ product: productId });
        if (existingCartItem) {
            existingCartItem.quantity += quantity;
            existingCartItem.priceAtAdd += priceAtAdd;
            await existingCartItem.save();
            await existingCartItem.populate('product', 'productName price image');
            return res.status(200).json({ message: "Cart updated", cartItem: existingCartItem });
        }

        const cartItem = await CartModel.create({
            product: productId,
            quantity,
            priceAtAdd
        });

        await cartItem.populate('product', 'productName price image');
        res.status(201).json({ message: "Product added to cart", cartItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export default { addToCart }; 
