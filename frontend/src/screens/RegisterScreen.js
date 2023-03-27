import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Row,Col,Button,Form} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'  
import {register} from '../actions/userAction.js'  
import FormContainer from '../components/FormContainer.js' 
function RegisterScreen({location,history}) {
   
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const [confirmPassword,setConfirmPassword]= useState('')
    const [name,setName]= useState('')
    const [message,setMessage]= useState(null)
    
    const dispatch=useDispatch()
    const userRegister=useSelector((state)=>state.userRegister)
    const {loading,error,userInfo}=userRegister
    const redirect=location.search ? location.search.split("=")[1]:'/'
    useEffect(()=>{
          if(typeof userInfo === 'object' && Object.keys(userInfo).length!==0){
              history.push(redirect)
          }

    },[history,userInfo,redirect]) 

     const submitHandler=(e)=>{
         e.preventDefault()
         var a=''
         if(name===a || password===a || confirmPassword===a || email===a){
            setMessage("Enter all the credentials")
         }
         else if(password!==confirmPassword){
             setMessage("Password do no match")
         }
         else{ 
         dispatch(register(name,email,password))
         }
     }
     
    return <FormContainer>
            <h2>Sign Up</h2>
            {error && <Message variant='danger'>{error}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            {loading && <Loader/>}
            <Form >
            <Form.Group controlId="name">
                    <Form.Label >Name</Form.Label>
                    <Form.Control 
                       type="name"
                       placeholder="Enter your name"
                       value={name}
                       onChange={(e)=> setName(e.target.value)}
                       required="true"
                       >
                       
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label >Email Address</Form.Label>
                    <Form.Control 
                       type="email"
                       placeholder="Enter email"
                       value={email}
                       onChange={(e)=> setEmail(e.target.value)}
                       required="true"
                       >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label >Password</Form.Label>
                    <Form.Control 
                       type="password"
                       placeholder="Enter password"
                       value={password}
                       onChange={(e)=> setPassword(e.target.value)}
                       required="true"
                       >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                    <Form.Label >Confirm Password</Form.Label>
                    <Form.Control 
                       type="password"
                       placeholder="Confirm password"
                       value={confirmPassword}
                       onChange={(e)=> setConfirmPassword(e.target.value)}
                       required="true"
                       >
                    </Form.Control>
                </Form.Group>
                <Button onClick={submitHandler} style={{marginTop:"10px"}} variant="dark">
                    Register
                </Button>
                  <Row className="py-3">
                    <Col>
                      Have an account?{' '}
                      <Link to={redirect? `/login?redirect=${redirect}`:'/login'}>
                          LogIn
                      </Link>
                    </Col>
                </Row>
            </Form>
          </FormContainer>
        
}

export default RegisterScreen
