import React,{useEffect} from 'react'
import {Row,Col,Button,ListGroup,Image,Card,FormControl} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message.js'
import { addToCart ,removeCart} from '../actions/cartAction.js'
function CartScreen({match,location,history}) {

     const productId=match.params.id
     const qty=location.search ? Number(location.search.split('=')[1]):1
     const dispatch=useDispatch()

     const cart=useSelector(state=>state.cart)
     const{cartItems}=cart
     const userLogin=useSelector(state=>state.userLogin)
     const{userInfo}=userLogin
      console.log(cartItems)
     useEffect(() => {
         if(productId){
             dispatch(addToCart(productId,qty))
         }
     }, [dispatch,productId,qty])

       
     const checkOutHandler=()=>{
         if(userInfo){
            history.push('/shipping')
         }
         history.push('/login?redirect=shipping')
     }

     const removeCartHandler=(id)=>{
        dispatch(removeCart(id))
        
     }
    return <> 
        
         <Row>
             <h4>Shopping Cart</h4>
                <Col md='8'>
                  {cartItems.length===0?(<Message variant="primary">
                      <h3>Your cart is empty ....! <Link to='/'>Go Back</Link></h3>
                  </Message>):(
                    <ListGroup variant='flush'>
                      {cartItems.map((item)=>( 
                          <ListGroup style={{marginTop:"20px"}} key={item.product}>
                               <Row>
                                   <Col md="2">
                                       <Image src={item.image} alt={item.name} fluid/>
                                   </Col>
                                   <Col md="3" >
                                       <Link className="decorate" to={`/product/${item.id}`}>{item.name}</Link>
                                   </Col>
                                   <Col md='2'>{item.price}</Col>
                                   <Col md='3'>
                                   <FormControl
                                      as='select'
                                      value={item.qty}
                                      onChange={(e)=>{
                                          dispatch(addToCart(item.product,Number(e.target.value)))
                                      }}
                                    >
                                        {
                                            [...Array(item.countInStock).keys()].map(x=>(                                               
                                                <option key={x+1} value={x+1}>
                                                  {x+1}
                                                </option>
                                                ))                                           
                                        }

                                    </FormControl>
                                   </Col>
                                   <Col md="2">
                                       <Button onClick={()=>{removeCartHandler(item.product)}} type="button" variant="light">
                                           <i className="fas fa-trash"></i>
                                       </Button>
                                   </Col>
                               </Row>
                          </ListGroup>
                      ))}
                      
                    </ListGroup>
                    
                  )}
                </Col>
                <Col md='4'>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h4 className="text-center">SubTotal ({cartItems.reduce((acc,item)=>acc+item.qty,0)}) Items</h4>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                     <h5> Price</h5>
                                    </Col>
                                    <Col>
                                       <h5 className="price">{cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}</h5>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <Button type="button" onClick={checkOutHandler} style={{marginLeft:"60px"}} className="btn-block btn-dark" disabled={cartItems.length===0}>Proceed To Checkout</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <hr/>
            </>
        
    
}

export default CartScreen
