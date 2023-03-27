import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Row,Col,ListGroup,Image, Button} from 'react-bootstrap'
import Message from '../components/Message.js'
import {deliverOrder, getOrderDetails, payOrder} from '../actions/orderAction.js'
import Loader from '../components/Loader.js'  
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'


function OrderScreen({match,history}) {
    const dispatch=useDispatch()
    const cart=useSelector(state=>state.cart)
    const orderId=match.params.id
    const orderDetails=useSelector(state=>state.orderDetails)
    const{order,loading,error}=orderDetails

    const orderPay=useSelector(state=>state.orderPay)
    const{loading:loadingpay,success:successPay}=orderPay

    const orderDeliver=useSelector(state=>state.orderDeliver)
    const{loading:loadingDeliver,success:successDeliver}=orderDeliver

    const usersLogin=useSelector(state=>state.userLogin)
    const {userInfo}=usersLogin

    const[sdkReady,setSdkReady]=useState(false)
    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }
        const addPayPalScript=async()=>{
            const {data:clientId}=await axios.get('/api/config/paypal')
            const script=document.createElement('script')
            script.type='text/javascript'
            script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async=true
            script.onload=()=>{
                  setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        
        if(!order || successPay || successDeliver){
            dispatch({type:'ORDER_PAY_RESET'})
            dispatch({type:'ORDER_DELIVER_RESET'})
            dispatch(getOrderDetails(orderId))
        }
        else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }
            else{
                setSdkReady(true)
            }
        }   
    }, [dispatch,orderId,order,successPay,successDeliver,history,userInfo]) 
    const successPaymentHandler=(paymentResult)=>{
          console.log(paymentResult)
          dispatch(payOrder(orderId,paymentResult))
    }

    const deliverHandler=(e)=>{
          e.preventDefault()
          dispatch(deliverOrder(order))
    }

    return loading?<Loader/>: error ? <Message variant="danger">{error}</Message>:(
        <>
        <hr/>
        <h2 style={{marginTop:"10px"}}>Order Id : {orderId}</h2>
        <Row>
            <Col md={8}>
                <ListGroup variant="fluid">
                <ListGroup.Item>
                <h2>Shipping Address</h2>
                <p><strong>Address : </strong>
               {order.shippingAddress.address},<br/>
                <pre className="tab">        {order.shippingAddress.city},
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country}</pre>
                </p>
                <p><strong>Name : </strong>{order.user.name}</p>
                <p><strong>Email : </strong><a href={ `mailto:${order.user.email}`}>{order.user.email}</a></p>
                </ListGroup.Item>
                <ListGroup.Item>
                <h2>Payment</h2>
                <p><strong>Payment Method : </strong>
                {order.paymentMethod}
                </p>
                {order.isPaid ? <Message variant="success">Paid on {order.paidAt}</Message>:<Message variant="danger">Not Paid</Message>}
                </ListGroup.Item>
                <ListGroup.Item>
                <h2>Orders</h2>
                <p><strong>Order Items : </strong></p>
                {order.orderItems.length===0?(<Message variant="primary">Your cart is empty</Message>):(
                    <ListGroup variant="flush" style={{marginBottom:"10px"}}>
                        {order.orderItems.map((item)=>( 
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
                {order.isDelivered ? <Message variant="success">Delivered on {order.deliveredAt}</Message>:<Message variant="danger">Not Delivered</Message>}

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
                            
                            <Col style={{textAlign:"right"}}>₹ {order.itemsPrice=
 order.orderItems.reduce((acc,item)=>acc+item.qty*item.price,0 ).toFixed(2)}</Col> 
                        </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Row>
                            <Col>Shipping</Col>
                            <Col style={{textAlign:"right"}}>₹ {order.shippingPrice}</Col>
                        </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Row>
                            <Col>Tax</Col>
                            <Col style={{textAlign:"right"}}>₹ {order.taxPrice}</Col>
                        </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Row>
                            <Col>Total</Col>
                            <Col style={{textAlign:"right"}}>₹ {order.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    {!order.isPaid&& (
                        <ListGroup.Item>
                            {loadingpay&& <Loader/>}
                            {!sdkReady? <Loader/>:(
                                <PayPalButton
                                amount={order.totalPrice}
                                onSuccess={successPaymentHandler}
                                />
                            )}
                        </ListGroup.Item>
                    )}
                    {loadingDeliver && <Loader/>}
                    {((userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered) ) &&(
                        <ListGroup.Item>
                            <Button type="button" className="btn form-control btn-dark"  onClick={deliverHandler}>
                                Mark as Delivered
                            </Button>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Col>
        </Row>
        <hr/>
        </>
    )
}

export default OrderScreen
