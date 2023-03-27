import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer,productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productReviewCreateReducer, productTopReducer } from '../reducers/productReducers'
import { cartReducer } from '../reducers/cartReducer'
import { updateProfileReducer, userDetailsReducer, userLoginReducer,userRegisterReducer, userDeleteReducer, usersListReducer, userUpdateReducer } from '../reducers/userReducer'
import { orderCreateReducer, orderDeliverReducer, orderDetailsReducer, orderListMyReducer, orderListReducer, orderPayReducer } from '../reducers/orderReducers'

const reducer=combineReducers({
    cart:cartReducer,
    productList:productListReducer,
    productDetails:productDetailsReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,
    productTop:productTopReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    usersList:usersListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,
    updateProfie:updateProfileReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderMyList:orderListMyReducer,
    orderList:orderListReducer,
    orderDeliver:orderDeliverReducer,
    productReviewCreate:productReviewCreateReducer
    
})
const cartItemfromStorage=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
const userInfofromStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):[]
const shippingAddressfromStorage=localStorage.getItem('shippingAddress')?JSON.parse(localStorage.getItem('shippingAddress')):{}
const savePaymentMethodfromStorage=localStorage.getItem('paymentMethod')?JSON.parse(localStorage.getItem('paymentMethod')):{}
const initialState={
    cart:{
        cartItems:cartItemfromStorage,
        shippingAddress:shippingAddressfromStorage,
        paymentMethod:savePaymentMethodfromStorage
    },
    userLogin:{
        userInfo:userInfofromStorage
    }
}
const middleware=[thunk]
const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))



export default store