import express from 'express';
import multer from 'multer';
import productController from '../controller/product.controller.js';
import protect from '../middleware/auth.middleware.js';

const upload  = multer({storage: multer.memoryStorage()});

const router = express.Router();

router.get('/products', productController.getAllProducts);
router.post('/product', protect, upload.single('image'), productController.productUpload);

export default router;