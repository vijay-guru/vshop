import React,{useState,useEffect} from 'react'
import {Row,Col,Button,ListGroup,Image, FormControl, Form} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import {useDispatch,useSelector} from 'react-redux'
import {createReviewProduct, listProductDetails} from '../actions/productAction.js'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'

function ProductScreen({history,match}) {
    const [qty,setQty]=useState(1)
    const [rating,setRating]=useState(0)
    const [comment,setComment]=useState('')

    const dispatch=useDispatch()

    const productListDetails=useSelector(state=>state.productDetails)
    const {loading,error,product}=productListDetails

    const productReviewCreate=useSelector(state=>state.productReviewCreate)
    const {error:errorReviewCreate,success:successReviewCreate}=productReviewCreate

    const userLogin=useSelector(state=>state.userLogin)
    const {userInfo}=userLogin

    useEffect(()=>{
        if(successReviewCreate){
            alert("Review submited")
            setRating(0)
            setComment(0)
            dispatch({type:'PRODUCT_CREATE_REVIEW_RESET'})
        }
        dispatch(listProductDetails(match.params.id))
    },[dispatch,match,successReviewCreate])

    const addToCartHandler=()=>{
            history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    const submitHandler=()=>{
        dispatch(createReviewProduct(match.params.id,{
            rating,
            comment
        }))
}

    return (
        <>
        <Link className="btn btn-light my-3 p-2" to="/">Go Back</Link>
        {loading?<Loader/>:error?(<Message variant='danger'>{error}</Message>):(
            <>
           <Row>
               <Col md={6}>
               <Image src={product.image} className="px-5" fluid/>
               </Col>
               <Col md={3}>
                   <ListGroup variant="flush">
                       <ListGroup.Item>
                           <h3>{product.name}</h3>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <Rating rating={product.rating} text={`${product.numReviews} reviews`}></Rating>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <strong>₹ {product.price}</strong>
                       </ListGroup.Item>
                       <ListGroup.Item>
                          Description : {product.description}
                       </ListGroup.Item>
                   </ListGroup>
               </Col>
               <Col md={3}>
                    <ListGroup>
                       <ListGroup.Item >
                           <Row>
                               <Col>
                               <strong>Price :</strong>
                               </Col>
                               <Col>
                               <strong>₹ {product.price}</strong>
                               </Col>
                           </Row>
                       </ListGroup.Item>
                       <ListGroup.Item>
                       <Row>
                            <Col>
                               <p>Status :</p>
                            </Col>
                            <Col>
                               <p>{product.countInStock>0?"Instock":"Out of Stock"}</p>
                            </Col>
                        </Row>
                       </ListGroup.Item>
                       
                       {product.countInStock>0 && (
                            <ListGroup.Item>
                                <Row>
                                    <Col>Qty</Col>
                                    <Col>
                                    <FormControl
                                      as='select'
                                      value={qty}
                                      onChange={(e)=>{
                                          setQty(e.target.value)
                                      }}
                                    >
                                        {
                                            [...Array(product.countInStock).keys()].map(x=>(                                               
                                                <option key={x+1} value={x+1}>
                                                  {x+1}
                                                </option>
                                                ))                                           
                                        }

                                    </FormControl>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            )}
                        
                       <ListGroup.Item style={{textAlign:"center"}}>
                           <Button onClick={addToCartHandler} className="btn btn-dark" type="button" disabled={product.countInStock===0}>Add To Cart</Button>
                       </ListGroup.Item>
                    </ListGroup>
               </Col>
          </Row> 
          <hr/>
          <Row>
             <Col md={6}>
                 {errorReviewCreate && <Message variant="danger">{errorReviewCreate}</Message>}
                 <h3>Reviews</h3>
                 {Array.isArray(product.reviews) && product.reviews.length===0 && <Message variant="danger">No reviews</Message>}
                 <ListGroup variant="flush">
                 {Array.isArray(product.reviews) &&product.reviews.map((review=>(
                     
                     <ListGroup.Item key={review._id}>
                         <strong>{review.name}</strong>
                         <Rating rating={review.rating}/>
                         <p>{review.comment}</p>
                     </ListGroup.Item>
                     )))}
                     <ListGroup.Item>
                     <h3>Write a customer review</h3>
                         {userInfo && userInfo.length===0 ? (
                             <Message variant="success">Please <Link to='/login'>Sign In</Link> to review</Message>
                            
                         ):
                         (
                            <Form>
                            <Form.Group controlId="rating">
                                <Form.Label>Rating</Form.Label>
                                <Form.Control as="select" value={rating} onChange={(e)=>setRating(e.target.value)}>
                                     <option value=''>Select...</option>
                                     <option value='1'>1 - Poor</option>
                                     <option value='2'>2 - Fair</option>
                                     <option value='3'>3 - Good</option>
                                     <option value='4'>4 - Very good</option>
                                     <option value='5'>5 - Excellent</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="comment">
                                <Form.Label>Comment</Form.Label>
                                <Form.Control as="textarea" row="3" value={comment} onChange={(e)=>setComment(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Button className="btn-sm" style={{backgroundColor:"#D4AF37",color:"black",marginTop:"5px"}} onClick={submitHandler}>Submit</Button>
                        </Form>
                         )}
                     </ListGroup.Item>
                 </ListGroup>
             </Col>
          </Row>
          </>
        )}
          <hr/>
        </>
    )
}

export default ProductScreen


