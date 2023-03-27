import React from 'react'
import { Card} from 'react-bootstrap'
import Rating from './Rating'
import {Link} from 'react-router-dom'
function Product({product}) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product._id}`} >
            <Card.Img style={{height:"300px",width:"100%",objectFit:"fill"}} src={product.image} />
            </Link>
            <Link to={`/product/${product._id}`} className="decorate">
            <Card.Title as='div'>{product.name}</Card.Title>
            </Link>
            <Card.Text as='p'>
                <Rating rating={product.rating} text={`${product.numReviews} reviews`}/>
            </Card.Text>
            <Card.Text as='p'><strong>₹ {product.price}</strong></Card.Text>
        </Card>
    )
}

export default Product
