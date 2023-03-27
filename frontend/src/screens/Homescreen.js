import React,{useEffect} from 'react'
import Product from '../components/Product'
import {Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import {listProducts} from '../actions/productAction.js'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import CarouselTop from '../components/CarouselTop.js'
import Paginate from '../components/Paginate.js'
function Homescreen({match}) {
    const keyword=match.params.keyword
    const pageNumber=match.params.pageNumber || 1
    const dispatch=useDispatch()

    const productList=useSelector(state=>state.productList)
    const {loading,error,product,page,pages}=productList
    useEffect(()=>{
        dispatch(listProducts(keyword,pageNumber))
    },[dispatch,keyword,pageNumber])
    return (
        <div>
            {!keyword && <CarouselTop />}
            <h2 >LATEST PRODUCTS</h2>
            {loading?<Loader/>:error?(<Message variant='danger'>{error}</Message>):( 
            <Row>
            {product.map((products)=>(
            <Col sm="12" md="6" lg="4" xl="3">
                <Product   product={products} />
                </Col>
            ))}
            
        </Row>
            )}
            <Paginate  page={page} pages={pages} keyword={keyword ? keyword :''}></Paginate>
        </div>
    )
}

export default Homescreen
