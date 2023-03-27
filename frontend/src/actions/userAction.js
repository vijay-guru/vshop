import axios from 'axios'
export const login=(email,password)=>async(dispatch)=>{
   try {
       dispatch({type:'USER_LOGIN_REQUEST'})

       const config={
           headers:{
               'Content-type':'application/json'
           }
       }

       const {data}=await axios.post('/api/user/login',{email,password},config)

       dispatch({type:'USER_LOGIN_SUCCESS',
                 payload: data              
               })
               localStorage.setItem('userInfo',JSON.stringify(data))
   } catch (error) {
    dispatch({type:'USER_LOGIN_FAIL',
    payload: error.response && error.response.data.message? error.response.data.message :error.message             
  })
   }
}



export const logout=()=>(dispatch)=>{
    localStorage.removeItem('userInfo')
    dispatch({type:'USER_LOGOUT'})
    dispatch({type:'ORDER_LIST_MY_RESET'})
    dispatch({type:'USER_DETAILS_RESET'})
    dispatch({type:'USER_LIST_RESET'})
}
export const register=(name,email,password)=>async(dispatch)=>{
    try {
        dispatch({type:'USER_REGISTER_REQUEST'})
 
        const config={
            headers:{
                'Content-type':'application/json'
            }
        }
 
        const {data}=await axios.post('/api/user/',{name,email,password},config)
 
        dispatch({type:'USER_REGISTER_SUCCESS',
                  payload: data              
                })
        dispatch({type:'USER_LOGIN_SUCCESS',
                payload: data              
              })
        localStorage.setItem('userInfo',JSON.stringify(data))
    } catch (error) {
     dispatch({type:'USER_REGISTER_FAIL',
     payload: error.response && error.response.data.message? error.response.data.message :error.message             
   })
    }
 }

 export const getUserDetails=(id)=>async(dispatch,getState)=>{

    
    try {
        dispatch({type:'USER_DETAILS_REQUEST'})
        const {userLogin:{userInfo}}=getState()
        const config={
            headers:{
                'Content-type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
 
        const {data}=await axios.get(`/api/user/${id}`,config)
 
        dispatch({type:'USER_DETAILS_SUCCESS',
                  payload: data              
                })

    } catch (error) {
     dispatch({type:'USER_DETAILS_FAIL',
     payload: error.response && error.response.data.message? error.response.data.message :error.message             
   })
    }
 }

 export const updateUserProfile=(user)=>async(dispatch,getState)=>{
    try {
        dispatch({type:'USER_UPDATE_PROFILE_REQUEST'})
        const {userLogin:{userInfo}}=getState()
        const config={
            headers:{
                'Content-type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
 
        const {data}=await axios.put('/api/user/profile',user,config)
 
        dispatch({type:'USER_UPDATE_PROFILE_SUCCESS',
                  payload: data              
                })
                dispatch({type:'USER_LOGIN_SUCCESS',
                payload: data              
              })
        localStorage.setItem('userInfo',JSON.stringify(data))

    } catch (error) {
     dispatch({type:'USER_UPDATE_PROFILE_FAIL',
     payload: error.response && error.response.data.message? error.response.data.message :error.message             
   })
    }
 }

 export const listUser=()=>async(dispatch,getState)=>{
    try {
        dispatch({type:'USER_LIST_REQUEST'})
        const {userLogin:{userInfo}}=getState()
        const config={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
 
        const {data}=await axios.get('/api/user/',config)
 
        dispatch({type:'USER_LIST_SUCCESS',
                  payload: data              
                })

    } catch (error) {
     dispatch({type:'USER_LIST_FAIL',
     payload: error.response && error.response.data.message? error.response.data.message :error.message             
   })
    }
 }

 export const deleteUser=(id)=>async(dispatch,getState)=>{
    try {
        dispatch({type:'USER_DELETE_REQUEST'})
        const {userLogin:{userInfo}}=getState()
        const config={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
 
        await axios.delete(`/api/user/${id}` ,config)
 
        dispatch({type:'USER_DELETE_SUCCESS'})

    } catch (error) {
     dispatch({type:'USER_DELETE_FAIL',
     payload: error.response && error.response.data.message? error.response.data.message :error.message             
   })
    }
 }

 export const updateUser=(user)=>async(dispatch,getState)=>{
    try {
        dispatch({type:'USER_UPDATE_REQUEST'})
        const {userLogin:{userInfo}}=getState()
        const config={
            headers:{
                'Content-type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
 
        const {data}=await axios.put(`/api/user/${user._id}`,user ,config)
 
        dispatch({type:'USER_UPDATE_SUCCESS'})
        dispatch({type:'USER_DETAILS_SUCCESS',payload:data})

    } catch (error) {
     dispatch({type:'USER_UPDATE_FAIL',
     payload: error.response && error.response.data.message? error.response.data.message :error.message             
   })
    }
 }
 export const sendEmail=(email,complaint)=>async(dispatch,getState)=>{
    try {
        const config={
            headers:{
                'Content-type':'application/json'
            }
        }
        const file={
            email,complaint
        }
 
        const {data}=await axios.post(`api/user/email`,file ,config)
        console.log(data)

    } catch (error) {
        console.log(error)            
   }
    }
 