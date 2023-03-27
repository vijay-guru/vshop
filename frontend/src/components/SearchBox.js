import React,{useState} from 'react'
import {Form,Button} from 'react-bootstrap'

function SearchBox({history}) {
    const [keyword,setKeyWord]=useState('')

    const submitHandler=(e)=>{
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        }
        else{
            alert("Enter the product you want")
            history.push('/')
        }
    }
    return (
        <Form onSubmit={submitHandler} className="formik jusitfy-content-center" inline>
            <Form.Control
               type="text"
               name="q"
               onChange={(e)=>setKeyWord(e.target.value)}  
               placeholder="Search Products..."
               className="mr-sm-2 ml-sm-5">
                </Form.Control>  
               <Button style={{marginLeft:"5px"}} type="submit" variant="outline-success" className="p-2" >
                   Search
               </Button>
        </Form>
    )
}

export default SearchBox
