import React,{useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Button,Form,Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer.js' 
import { savePaymentMethod } from '../actions/cartAction.js'
import CheckoutStep from '../components/CheckoutStep.js'

function PaymentScreen({history}) {
    const cart=useSelector(state=>state.cart)
    const{shippingAddress}=cart
    if(!shippingAddress){
        history.push('/shipping')
    }
    const[paymentMethod,setPaymentMethod]=useState('Paypal')

    const dispatch=useDispatch()
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
    return (
        <FormContainer>
            <CheckoutStep step1 step2 step3></CheckoutStep>
            <h2 style={{textAlign:"center"}}>Payment Method</h2>
            <Form style={{padding:"15px"}} className="block-example border border-dark">
            <Form.Group>
                <Form.Label as="legend" >Select Payment Method</Form.Label><br/>
            </Form.Group >
                 <Col >
                 <Form.Check
                  type="radio"
                  label="Paypal or Credit card"
                  id="Paypal"
                  value="Paypal"
                  name="paymentMethod"
                  checked
                  onChange={(e)=>{setPaymentMethod(e.target.value)}}
                 ></Form.Check>
                 </Col>
                <Button style={{marginTop:"10px"}} onClick={submitHandler} variant="dark">Confirm</Button>
                
           </Form>
        </FormContainer>
    )
}

export default PaymentScreen
