import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Button,Table} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { listOrders } from '../actions/orderAction.js'

function OrderListScreen({history}) {
    const dispatch=useDispatch()
    const orderList=useSelector(state=>state.orderList)
    const {loading,error,orders}=orderList

    const usersLogin=useSelector(state=>state.userLogin)
    const {userInfo}=usersLogin

    const userDelete=useSelector(state=>state.userDelete)
    const {success:successDelete}=userDelete

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listOrders())
        }
        else{
            history.push('/login')
        }
        
    },[dispatch,history,userInfo,successDelete])


    return (
        <>
           <h2 style={{textAlign:"center"}}>Orders List</h2>
           {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message>:(
              <Table stripped="true" bordered hover responsive className="table-sm">
                 <thead>
                     <tr>
                         <th>ID</th>
                         <th>Customer</th>
                         <th>Date</th>
                         <th>Total</th>
                         <th>Paid</th>
                         <th>Delivered</th>
                         <th></th>
                     </tr>
                 </thead>
                 <tbody>
                 {orders.map(order=>(
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ?  (order.paidAt.substring(0,10)) :(<i className="fas fa-times" style={{color:"red"}}></i>)}</td>
                                <td>{order.isDelivered ?  (order.deliveredAt.substring(0,10)) :(<i className="fas fa-times" style={{color:"red"}}></i>)}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className="btn-sm btn-dark">
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                 ))}</tbody>
              </Table>
           )}
            
        </>
    )
}

export default OrderListScreen
