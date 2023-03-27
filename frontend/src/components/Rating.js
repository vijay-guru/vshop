import React from 'react'

function Rating({rating,text}) {
    return (
        <div>
            <span style={{color:"#D4AF37"}}>
                <i className={rating>=1?"fas fa-star":rating>=0.5?"fas fa-star-half-alt":"far fa-star"}></i>
            </span>
            <span style={{color:"#D4AF37"}}>
                <i className={rating>=2?"fas fa-star":rating>=1.5?"fas fa-star-half-alt":"far fa-star"}></i>
            </span >
            <span style={{color:"#D4AF37"}}>
                <i className={rating>=3?"fas fa-star":rating>=2.5?"fas fa-star-half-alt":"far fa-star"}></i>
            </span>
            <span style={{color:"#D4AF37"}}>
                <i className={rating>=4?"fas fa-star":rating>=3.5?"fas fa-star-half-alt":"far fa-star"}></i>
            </span>
            <span style={{color:"#D4AF37"}}>
                <i className={rating>=5?"fas fa-star":rating>=4.5?"fas fa-star-half-alt":"far fa-star"}></i>
            </span>
            <span style={{marginLeft:"5px"}}>{text}</span>
        </div>
    )
}

export default Rating
