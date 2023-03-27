import express from 'express';
import { createProduct, createProductReview, deleteProduct, getProducts, getProductsById, getTopProduct, updateProduct } from '../controllers/productController.js';
import { admin, protect} from '../middleware/authMiddleware.js'
const router=express.Router()

router.route('/top').get(getTopProduct)
router.route('/:id/reviews').post(protect,createProductReview)
router.route('/:id').get(getProductsById).delete(protect,admin,deleteProduct).put(protect,admin,updateProduct)
router.route('/').post(protect,admin,createProduct).get(getProducts)



export default router 