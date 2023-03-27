import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Button,Table} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'  
import { deleteUser, listUser } from '../actions/userAction'

function UserListScreen({history}) {
    const dispatch=useDispatch()
    const usersList=useSelector(state=>state.usersList)
    const {loading,error,users}=usersList

    const usersLogin=useSelector(state=>state.userLogin)
    const {userInfo}=usersLogin

    const userDelete=useSelector(state=>state.userDelete)
    const {success:successDelete}=userDelete

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listUser())
        }
        else{
            history.push('/login')
        }
        
    },[dispatch,history,userInfo,successDelete])

    const deleteHandler=(id)=>{
        dispatch(deleteUser(id))

    }

    return (
        <>
           <h2 style={{textAlign:"center"}}>Users List</h2>
           {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message>:(
              <Table stripped="true" bordered hover responsive className="table-sm">
                 <thead>
                     <tr>
                         <th>ID</th>
                         <th>NAME</th>
                         <th>EMAIL</th>
                         <th>ADMIN</th>
                         <th></th>
                     </tr>
                 </thead>
                 <tbody>
                 {users.map(user=>(
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td>{user.isAdmin ? <i className="fas fa-check" style={{color:"green"}}></i>:
                                    <i className="fas fa-times" style={{color:"red"}}></i>}
                                </td>
                                <td>
                                    <LinkContainer style={{marginLeft:"20px"}} to={`/admin/user/${user._id}/edit`}>
                                    <i className="fas fa-edit"></i>
                                    </LinkContainer>
                                    <Button style={{marginLeft:"20px"}}
                                    variant="dark" className="btn-sm deleteButton"
                                    onClick={()=>deleteHandler(user._id)}>
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                 ))}</tbody>
              </Table>
           )}
            
        </>
    )
}

export default UserListScreen
