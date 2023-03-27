import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Row,Col,Button,Form} from 'react-bootstrap'
import { Table } from 'react-bootstrap'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'  
import {getUserDetails, updateUserProfile} from '../actions/userAction.js'  
import { listMyOrders } from '../actions/orderAction.js'
import { LinkContainer } from 'react-router-bootstrap'
function ProfileScreen({history}) {
   
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const [confirmPassword,setConfirmPassword]= useState('')
    const [name,setName]= useState('')
    const [message,setMessage]= useState(null)
    const [updatedMessage,setUpdatedMessage]= useState(null)
    
    const dispatch=useDispatch()
    const userDetails=useSelector((state)=>state.userDetails)
    const {loading,error,user}=userDetails

    const userLogin=useSelector((state)=>state.userLogin)
    const {userInfo}=userLogin 

    const orderMyList=useSelector((state)=>state.orderMyList)
    const {loading:loadingOrder,error:errorOrder,orders}=orderMyList

    const updateProfie=useSelector(state=>state.updateProfie)
    const {success}=updateProfie

    useEffect(()=>{
          if(!userInfo){
              history.push('/login')
          }
          else{
              if(!user ||!user.name || success){
                  dispatch({type:'USER_UPDATE_PROFILE_RESET'})
                  dispatch(listMyOrders())
                  dispatch(getUserDetails('profile'))
              }
              else{
                  setName(user.name)
                  setEmail(user.email)
              }
          }

    },[history,userInfo,dispatch,user,success]) 

     const submitHandler=(e)=>{
         e.preventDefault()
          if(password!==confirmPassword){
             setMessage("Password do no match")
         }
         else{ 
         dispatch(updateUserProfile({id:user._id,name,email,password}))
         setUpdatedMessage("Profile Updated Successfully")
         } 
         
     }
     
    return <Row>
            <Col md={4}>
            <h2 style={{marginTop:"40px"}}>My Profile</h2>
            {error && <Message variant='danger'>{error}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            {updatedMessage && <Message variant='success'>{updatedMessage}</Message>}
            {loading && <Loader/>}
            <Form >
            <Form.Group controlId="name">
                    <Form.Label >Name</Form.Label>
                    <Form.Control 
                       type="name"
                       placeholder="Enter your name"
                       value={name}
                       onChange={(e)=> setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label >Email Address</Form.Label>
                    <Form.Control 
                       type="email"
                       placeholder="Enter email"
                       value={email}
                       onChange={(e)=> setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label >Password</Form.Label>
                    <Form.Control 
                       type="password"
                       placeholder="Enter password"
                       value={password}
                       onChange={(e)=> setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                    <Form.Label >Confirm Password</Form.Label>
                    <Form.Control 
                       type="password"
                       placeholder="Confirm password"
                       value={confirmPassword}
                       onChange={(e)=> setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button onClick={submitHandler} style={{marginTop:"10px"}} variant="dark">
                    Update
                </Button>
            </Form>
            </Col>
            <Col md={8}><h2 style={{marginTop:"40px"}}>My Orders</h2>
            {loadingOrder?<Loader/>: errorOrder ?<Message variant="danger">{errorOrder}</Message>:(
                <Table stripped="true" bordered hover responsive variant="fluid" className="table-sm">
                    <thead>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                        <th></th>
                    </thead>
                    <tbody>
                        {orders.map(order=>(
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0,10):
                                    <i className="fas fa-times" style={{color:"red"}}></i>}
                                </td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0,10):
                                    <i className="fas fa-times"  style={{color:"red"}}></i>}
                                </td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                    <Button variant="dark" className="btn-sm">Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            </Col>
          </Row>
        
}

export default ProfileScreen
