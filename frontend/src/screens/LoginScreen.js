import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Row,Col,Button,Form} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'  
import {login} from '../actions/userAction.js'  
import FormContainer from '../components/FormContainer.js' 
function LoginScreen({location,history}) {
   
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    
    const dispatch=useDispatch()
    const userLogin=useSelector((state)=>state.userLogin)
    const {loading,error,userInfo}=userLogin
    const redirect=location.search ? location.search.split("=")[1]:'/'
    useEffect(()=>{
          if(typeof userInfo === 'object' && Object.keys(userInfo).length!==0){
              history.push(redirect)
          }

    },[history,userInfo,redirect]) 

     const submitHandler=(e)=>{
         e.preventDefault()
         if(email === '' || password === ''){
             alert('Please enter your credentials');
             return;
         }
         dispatch(login(email,password))
     }
     
    return <FormContainer>
            <h2 >Sign In</h2>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form >
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
                <Button onClick={submitHandler} style={{marginTop:"10px"}} variant="dark">
                    Sign In
                </Button>
                  <Row className="py-3">
                    <Col>
                      New register?{' '}
                      <Link to={redirect? `/register?redirect=${redirect}`:'/register'}>
                          Register
                      </Link>
                    </Col>
                </Row>
            </Form>
          </FormContainer>
        
}

export default LoginScreen
