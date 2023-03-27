import axios from 'axios'
export const listProducts=(keyword='',pageNumber='')=>async(dispatch)=>{
   try {
       dispatch({type:'PRODUCT_LIST_REQUEST'})

       const {data}=await axios.get(`/api/product?keyword=${keyword}&pageNumber=${pageNumber}`)

       dispatch({type:'PRODUCT_LIST_SUCCESS',
                 payload: data              
               })
   } catch (error) {
    dispatch({type:'PRODUCT_LIST_FAIL',
    payload: error.response && error.response.data.message? error.response.data.message :error.message             
  })
   }
}

export const listProductDetails=(id)=>async(dispatch)=>{
    try {
        dispatch({type:'PRODUCT_DETAIL_REQUEST'})
 
        const {data}=await axios.get(`/api/product/${id}`)
 
        dispatch({type:'PRODUCT_DETAIL_SUCCESS',
                  payload: data              
                })
    } catch (error) {
     dispatch({type:'PRODUCT_DETAIL_FAILS',
     payload:error.response && error.response.data.message? error.response.data.message :error.message
   })
    }
 }

 export const deleteProduct=(id)=>async(dispatch,getState)=>{
  try {
      dispatch({type:'PRODUCT_DELETE_REQUEST'})
      const {userLogin:{userInfo}}=getState()
        const config={
            headers:{
                'Content-type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }

      await axios.delete(`/api/product/${id}`,config)

      dispatch({type:'PRODUCT_DELETE_SUCCESS'})
  } catch (error) {
   dispatch({type:'PRODUCT_DELETE_FAILS',
   payload:error.response && error.response.data.message? error.response.data.message :error.message
 })
  }
}

export const createProduct=()=>async(dispatch,getState)=>{
  try {
      dispatch({type:'PRODUCT_CREATE_REQUEST'})
      const {userLogin:{userInfo}}=getState()
        const config={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data}=await axios.post('/api/product/',{},config)

      dispatch({type:'PRODUCT_CREATE_SUCCESS',
                payload:data
              })
  } catch (error) {
   dispatch({type:'PRODUCT_CREATE_FAILS',
   payload:error.response && error.response.data.message? error.response.data.message :error.message
 })
  }
}

export const updateProduct=(product)=>async(dispatch,getState)=>{
  try {
      dispatch({type:'PRODUCT_UPDATE_REQUEST'})
      const {userLogin:{userInfo}}=getState()
        const config={
            headers:{
              'Content-type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data}=await axios.put(`/api/product/${product._id}`,product,config)

      dispatch({type:'PRODUCT_UPDATE_SUCCESS',
                payload:data
              })
  } catch (error) {
   dispatch({type:'PRODUCT_UPDATE_FAILS',
   payload:error.response && error.response.data.message? error.response.data.message :error.message
 })
  }
}

export const createReviewProduct=(productId,review)=>async(dispatch,getState)=>{
  try {
      dispatch({type:'PRODUCT_CREATE_REVIEW_REQUEST'})
      const {userLogin:{userInfo}}=getState()
        const config={
            headers:{
              'Content-type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        await axios.post(`/api/product/${productId}/reviews`,review,config)

      dispatch({type:'PRODUCT_CREATE_REVIEW_SUCCESS'})
  } catch (error) {
   dispatch({type:'PRODUCT_CREATE_REVIEW_FAILS',
   payload:error.response && error.response.data.message? error.response.data.message :error.message
 })
  }
}

export const topProducts=()=>async(dispatch,getState)=>{
  try {
      dispatch({type:'PRODUCT_TOP_REQUEST'})
      const {userLogin:{userInfo}}=getState()

        const {data}=await axios.get(`/api/product/top`)

      dispatch({type:'PRODUCT_TOP_SUCCESS',
                payload:data})
  } catch (error) {
   dispatch({type:'PRODUCT_TOP_FAILS',
   payload:error.response && error.response.data.message? error.response.data.message :error.message
 })
  }
}