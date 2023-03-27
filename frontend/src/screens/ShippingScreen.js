import React,{useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Button,Form} from 'react-bootstrap'
import FormContainer from '../components/FormContainer.js' 
import { saveShippingAddress } from '../actions/cartAction.js'
import CheckoutStep from '../components/CheckoutStep.js'

function ShippingScreen({history}) {
    const cart=useSelector(state=>state.cart)
    const{shippingAddress}=cart
    const[address,setAddress]=useState(shippingAddress.address)
    const[city,setCity]=useState(shippingAddress.city)
    const[postalCode,setPostalCode]=useState(shippingAddress.postalCode)
    const[country,setCountry]=useState(shippingAddress.country)
    const dispatch=useDispatch()
    const submitHandler=(e)=>{
        e.preventDefault()
        if(address === '' || city === '' || postalCode === '' || country === ''){
            alert('Please enter your credentials');
            return;
        }
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        history.push('/payment')
    }
    return (
        <FormContainer>
            <CheckoutStep step1 step2></CheckoutStep>
            <h2 style={{textAlign:"center"}}>Shipping Address</h2>
            <Form>
            <Form.Group controlId="address">
                    <Form.Label >Address</Form.Label>
                    <Form.Control 
                       type="address"
                       placeholder="Enter your address"
                       value={address}
                       onChange={(e)=> setAddress(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label >City</Form.Label>
                    <Form.Control 
                       type="city"
                       placeholder="Enter your city"
                       value={city}
                       onChange={(e)=> setCity(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="postalCode">
                    <Form.Label >Postal Code</Form.Label>
                    <Form.Control 
                       type="postalCode"
                       placeholder="Enter your postal code"
                       value={postalCode}
                       onChange={(e)=> setPostalCode(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="country">
                    <Form.Label >Country</Form.Label>
                    <Form.Control 
                       type="country"
                       placeholder="Enter your country"
                       value={country}
                       onChange={(e)=> setCountry(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button style={{marginTop:"10px"}} onClick={submitHandler} variant="dark">Confirm</Button>
                
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
