import React,{useEffect} from 'react'
import {Carousel ,Image} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {topProducts} from '../actions/productAction.js'
import Loader from './Loader.js'
import Message from './Message.js'
import { Link } from 'react-router-dom'
import '../index.css'

function CarouselTop() {
    const dispatch=useDispatch()
    const productTop=useSelector(state=>state.productTop)
    const {loading,error,products}=productTop
    useEffect(() => {
        dispatch(topProducts())
    }, [dispatch])
    return loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> :(
        <Carousel style={{marginTop:"50px"}} className="bg-dark  carousel">
            {products.map((product)=>(
                <Carousel.Item key={product._id}>
                    <Link className="decorate" to={`/product/${product._id}`}>
                    <h3 className="imgcarousel">{product.name}  (₹{product.price})</h3>
                        <Image className="d-block imageCar mx-auto img-responsive"  src={product.image} alt={product.name}/>
                        <Carousel.Caption className="carousel-caption">
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default CarouselTop
