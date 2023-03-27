import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Button,Form} from 'react-bootstrap'
import axios from 'axios'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'  
import {listProductDetails, updateProduct} from '../actions/productAction.js'  
import FormContainer from '../components/FormContainer.js' 
function ProductEditScreen({match,history}) {
   const productId=match.params.id
    const [name,setName]= useState('')
    const [price,setPrice]= useState(0)
    const [brand,setBrand]= useState('')
    const [image,setImage]= useState('')
    const [countInStock,setCountInStock]= useState(0)
    const [description,setDescription]= useState('')
    const [uploading,setUploading]= useState(false)
    
    const dispatch=useDispatch()
    
    const productDetails=useSelector((state)=>state.productDetails)
    const {loading,error,product}=productDetails

    const productUpdate=useSelector((state)=>state.productUpdate)
    const {loading:loadingUpdate,error:errorUpdate,success:successUpdate}=productUpdate

    useEffect(()=>{
         if(successUpdate){
             dispatch({type:'PRODUCT_UPDATE_RESET'})
             history.push('/admin/productlist')
         }
         else{
            if(!product.name || product._id!==productId){
                dispatch(listProductDetails(productId))
            }
            else{
                setName(product.name)
                setPrice(product.price)
                setBrand(product.brand)
                setImage(product.image)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
         }
    },[dispatch,product,productId,history,successUpdate]) 

     const submitHandler=(e)=>{
         e.preventDefault()
         dispatch(updateProduct({
             _id:productId,
             name,
             price,
             brand,
             image,
             description,
             countInStock
         }))
     }
     
     const uploadHandler=async(e)=>{
          const file=e.target.files[0]
          const formData=new FormData()
          formData.append('image',file)
          setUploading(true)
          try {
            const config={
                headers:{
                  'Content-type':'miltipart/form-data',
                }
            }
            const {data}=await axios.post(`/api/upload/`,formData,config)
            setImage(data)
            setUploading(false)
              
          } catch (error) {
              console.log(error)
              setUploading(false)
              
          }
     }

    return <>
           <FormContainer>
            <h2 style={{marginTop:"20px"}}>Edit Product</h2>
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
                    <Form.Group controlId="price">
                        <Form.Label >Price</Form.Label>
                        <Form.Control 
                           type="number"
                           placeholder="Enter price"
                           value={price}
                           onChange={(e)=> setPrice(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="image">
                        <Form.Label >Image</Form.Label>
                        <Form.Control 
                           type="text"
                           placeholder="Enter image URL"
                           value={image}
                           onChange={(e)=> setImage(e.target.value)}>
                        </Form.Control>
                        <Form.File
                          id="image-file"
                          custom
                          onChange={uploadHandler}
                        >
                        </Form.File>
                        {uploading && <Loader/>}
                    </Form.Group>
                    <Form.Group controlId="brand">
                        <Form.Label >Brand</Form.Label>
                        <Form.Control 
                           type="text"
                           placeholder="Enter brand"
                           value={brand}
                           onChange={(e)=> setBrand(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="countInStock">
                        <Form.Label >countInStock</Form.Label>
                        <Form.Control 
                           type="number"
                           placeholder="Enter countInStock"
                           value={countInStock}
                           onChange={(e)=> setCountInStock(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label >Description</Form.Label>
                        <Form.Control 
                           type="textr"
                           placeholder="Enter description"
                           value={description}
                           onChange={(e)=> setDescription(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    
                    <Button onClick={submitHandler} style={{marginTop:"10px"}} variant="dark">
                        Update
                    </Button>
                </Form>
            )}
            
          </FormContainer>
          </>
        
}

export default ProductEditScreen
