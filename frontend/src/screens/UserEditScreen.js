import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Button,Form} from 'react-bootstrap'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'  
import {getUserDetails,updateUser} from '../actions/userAction.js'  
import FormContainer from '../components/FormContainer.js' 
function UserEditScreen({match,history}) {
   const userId=match.params.id
    const [email,setEmail]= useState('')
    const [isAdmin,setIsAdmin]= useState(false)
    const [name,setName]= useState('')
    
    const dispatch=useDispatch()
    
    const userDetails=useSelector((state)=>state.userDetails)
    const {loading,error,user}=userDetails

    const userUpdate=useSelector((state)=>state.userUpdate)
    const {loading:loadingUpdate,error:errorUpdate,success:successUpdate}=userUpdate
    useEffect(()=>{
          if(successUpdate){
              dispatch({type:'USER_UPDATE_RESET'})
              history.push('/admin/userlist')
          }
          else{
            if(!user.name || user._id!==userId){
                dispatch(getUserDetails(userId))
            }
            else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
          }

    },[dispatch,user,userId,history,successUpdate]) 

     const submitHandler=(e)=>{
         e.preventDefault()
         dispatch(updateUser({_id:userId,name,email,isAdmin}))
         
     }
     
    return <>
           <FormContainer>
            <h2 style={{marginTop:"40px"}}>Edit User</h2>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            { loading ? <Loader/>:error ? <Message variant='danger'>{error}</Message>:(
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
                    <Form.Group controlId="isadmin">
                        <Form.Check 
                           type="checkbox"
                           checked={isAdmin}
                           label="isAdmin"
                           onChange={(e)=> setIsAdmin(e.target.checked)}>
                        </Form.Check>
                    </Form.Group>
                    <Button onClick={submitHandler} style={{marginTop:"10px"}} variant="dark">
                        Update
                    </Button>
                </Form>
            )}
            
          </FormContainer>
          </>
        
}

export default UserEditScreen
