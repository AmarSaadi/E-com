import express from 'express';
import cartController from '../controller/cart.controller.js';
import protect from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/cart', protect, cartController.addToCart);

export default router;