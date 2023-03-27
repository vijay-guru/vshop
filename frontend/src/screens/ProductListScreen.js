import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Button,Table,Row,Col} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'  
import { createProduct, deleteProduct, listProducts } from '../actions/productAction'
import Paginate from '../components/Paginate.js'

function ProductListScreen({history,match}) {
    const pageNumber=match.params.pageNumber || 1
    const dispatch=useDispatch()
    const productList=useSelector(state=>state.productList)
    const {loading,error,product,page,pages}=productList

    const productDelete=useSelector(state=>state.productDelete)
    const {loading:loadingDelete,error:errorDelete,success:successDelete}=productDelete

    const productCreate=useSelector(state=>state.productCreate)
    const {loading:loadingCreate,error:errorCreate,success:successCreate,product:createdProduct}=productCreate

    const usersLogin=useSelector(state=>state.userLogin)
    const {userInfo}=usersLogin

    useEffect(()=>{
        dispatch({type:'PRODUCT_CREATE_RESET'})
        if(!userInfo || !userInfo.isAdmin){
            history.push('/login')
            
        }
        if(successCreate){
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }
        else{
            dispatch(listProducts('',pageNumber))
        }
    },[dispatch,history,userInfo,successDelete,successCreate,createdProduct,pageNumber])

    const deleteHandler=(id)=>{
         dispatch(deleteProduct(id))
    }
    const createProductHandler=()=>{
             dispatch(createProduct())
    }

    return (
        <>
        <Row className="align-items-center">
            <Col>
              <h3>PRODUCTS</h3>    
            </Col>
            <Col className="text-right createProduct">
                <Button className="my-3" variant="dark" onClick={createProductHandler}>
            <i className="fas fa-plus"></i>Create Product
            </Button>
            </Col>
        </Row>
        {loadingCreate && <Loader/>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loadingDelete && <Loader/>}
        {errorDelete && <Message variant="danger">{errorDelete}</Message>}
        {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message>:(
              <Table stripped="true" bordered hover responsive className="table-sm">
                 <thead>
                     <tr>
                         <th>ID</th>
                         <th>NAME</th>
                         <th>Price</th>
                         <th>Count In Stock</th>
                         <th>Brand</th>
                         <th></th>
                     </tr>
                 </thead>
                 <tbody>
                 {product.map(prod=>(
                            <tr key={prod._id}>
                                <td>{prod._id}</td>
                                <td>{prod.name}</td>
                                <td>{prod.price}</td>
                                <td style={{textAlign:"center"}}>{prod.countInStock}</td>
                                <td>{prod.brand}</td>
                                <td>
                                    <LinkContainer style={{marginLeft:"20px"}} to={`/admin/product/${prod._id}/edit`}>
                                    <i className="fas fa-edit"></i>
                                    </LinkContainer>
                                    <Button style={{marginLeft:"20px"}}
                                    variant="danger" className="btn-sm deleteButton"
                                    onClick={()=>deleteHandler(prod._id)}>
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                 ))}</tbody>
              </Table>
           )}
           <Paginate page={page} pages={pages} isAdmin="true"></Paginate>
        </>
    )
}

export default ProductListScreen
