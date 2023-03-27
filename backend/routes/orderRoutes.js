import express from 'express';
import { addOrderItems, getMyOrders, getOrderById, getOrders, updateOrderToDelivered, updateOrderToPaid } from '../controllers/orderController.js'
import { admin, protect} from '../middleware/authMiddleware.js'
const router=express.Router()

router.route('/').get(protect,admin,getOrders).post(protect,addOrderItems)
router.route('/myorders').get(protect,getMyOrders)
router.route('/:id/pay').put(protect,updateOrderToPaid)
router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered)
router.route('/:id').get(getOrderById)

export default router