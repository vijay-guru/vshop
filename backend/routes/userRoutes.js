import express from 'express';
import {authUser,deleteUser,getUserById,getUserProfile,getUsers,registerUser, sendeMail, updateUser, updateUserProfile } from '../controllers/userController.js'
import { admin, protect} from '../middleware/authMiddleware.js'
const router=express.Router()
router.route('/email').post(sendeMail)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
router.route('/:id').delete(protect,admin,deleteUser).get(getUserById).put(updateUser)
router.route('/').get(protect,admin,getUsers)
router.route('/').post(registerUser)
router.route('/login').post(authUser)



export default router