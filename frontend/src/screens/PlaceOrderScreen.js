import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Button,Row,Col,ListGroup,Image} from 'react-bootstrap'
import Message from '../components/Message.js'
import CheckoutStep from '../components/CheckoutStep.js'
import {createOrder} from '../actions/orderAction.js'

function PlaceOrderScreen({history}) {
    const cart=useSelector(state=>state.cart)
    const dispatch=useDispatch()

    const orderCreate=useSelector(state=>state.orderCreate)
    const{order,success,error}=orderCreate
    useEffect(() => {
        if(success){
            history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line
    }, [history,success])
    const{cartItems}=cart
    const placeOrderHandler=(e)=>{
           e.preventDefault()
           dispatch(createOrder({
               orderItems:cart.cartItems,
               shippingAddress:cart.shippingAddress,
               paymentMethod:cart.paymentMethod,
               itemsPrice:cart.itemsPrice,
               taxPrice:cart.taxPrice,
               shippingPrice:cart.shippingPrice,
               totalPrice:cart.totalPrice,
               createdAt:Date.now()
           }))
    }
//--------------------------------------------------------------------------------------------
// Calculation
   const addDecimal=(num)=>{
       return (Math.round(num*100)/100).toFixed(2)
   }
   cart.itemsPrice=addDecimal(
    cartItems.reduce((acc,item)=>acc+item.qty*item.price,0)
   )
   cart.shippingPrice=addDecimal( 
   cart.itemsPrice>500?100:0
   )
   cart.taxPrice=addDecimal(
       Number((0.18 * cart.itemsPrice).toFixed(2))
   )
   cart.totalPrice=addDecimal(
       Number(cart.itemsPrice)+
       Number(cart.shippingPrice)+
       Number(cart.taxPrice)
   )
//--------------------------------------------------------------------------------------------
    return (
        <>
        <CheckoutStep step1 step2 step3 step4></CheckoutStep>
        <hr/>
        <Row>
            <Col md={8}>
                <ListGroup variant="fluid">
                <ListGroup.Item>
                <h2>Shipping Address</h2>
                <p><strong>Address : </strong>
               {cart.shippingAddress.address},<br/>
                <pre className="tab">        {cart.shippingAddress.city},
                {cart.shippingAddress.postalCode},
                {cart.shippingAddress.country}</pre>
                </p>
                </ListGroup.Item>
                <ListGroup.Item>
                <h2>Payment</h2>
                <p><strong>Payment Method : </strong>
                {cart.paymentMethod}
                </p>
                </ListGroup.Item>
                <ListGroup.Item>
                <h2>Orders</h2>
                <p><strong>Order Items : </strong></p>
                {cart.cartItems.length===0?(<Message variant="primary">Your cart is empty</Message>):(
                    <ListGroup variant="flush" style={{marginBottom:"50px"}}>
                        {cartItems.map((item)=>( 
                          <ListGroup.Item  key={item.product}>
                               <Row >
                                   <Col md="1">
                                       <Image src={item.image} alt={item.name} fluid/>
                                   </Col>
                                   <Col >
                                       <Link className="decorate" to={`/product/${item.product}`}>{item.name}</Link>
                                   </Col>
                                   <Col md={4}>{item.qty} × {item.price} = ₹{item.qty * item.price}</Col>
                                   </Row>
                    </ListGroup.Item>
                ))}
                </ListGroup>)}
                </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <ListGroup variant="fluid">
                    <ListGroup.Item>
                        <h2 style={{textAlign:"center"}}>Order Summary</h2>
                    </ListGroup.Item>
                       <ListGroup.Item>
                        <Row>
                            <Col>Items</Col>
                            <Col style={{textAlign:"right"}}>₹ {cart.itemsPrice}</Col>
                        </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Row>
                            <Col>Shipping</Col>
                            <Col style={{textAlign:"right"}}>₹ {cart.shippingPrice}</Col>
                        </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Row>
                            <Col>Tax</Col>
                            <Col style={{textAlign:"right"}}>₹ {cart.taxPrice}</Col>
                        </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Row>
                            <Col>Total</Col>
                            <Col style={{textAlign:"right"}}>₹ {cart.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        {error && <Message variant="danger">{error}</Message>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button
                        className="btn-block btn-dark form-control"
                        type="button"
                        disabled={cart.cartItems.length===0}
                        onClick={placeOrderHandler} 
                        >Place Order</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
            <hr/>
        </>
    )
}

export default PlaceOrderScreen
