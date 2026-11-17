import express from 'express';
import categoryController from '../controller/category.controller.js'


const router = express.Router();

router.post('/category',categoryController.category)

export default router;