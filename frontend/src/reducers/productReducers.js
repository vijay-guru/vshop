export const productListReducer=(state={product:[]},action)=>{
         switch(action.type){
             case 'PRODUCT_LIST_REQUEST':
                 return {loading:true,product:[]}
             case 'PRODUCT_LIST_SUCCESS':
                 return {
                     loading:false,
                     product:action.payload.product,
                     page:action.payload.page,
                     pages:action.payload.pages
                }
             case 'PRODUCT_LIST_FAILS':
                 return {loading:true,error:action.payload}
             default:
                 return state
         }
}

export const productDetailsReducer=(state={product:{review:[]}},action)=>{
    switch(action.type){
        case 'PRODUCT_DETAIL_REQUEST':
            return {loading:true, ...state}
        case 'PRODUCT_DETAIL_SUCCESS':
            return {loading:false,product:action.payload}
        case 'PRODUCT_DETAIL_FAILS':
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const productDeleteReducer=(state={},action)=>{
    switch(action.type){
        case 'PRODUCT_DELETE_REQUEST':
            return {loading:true}
        case 'PRODUCT_DELETE_SUCCESS':
            return {loading:false,success:true}
        case 'PRODUCT_DELETE_FAILS':
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const productCreateReducer=(state={},action)=>{
    switch(action.type){
        case 'PRODUCT_CREATE_REQUEST':
            return {loading:true}
        case 'PRODUCT_CREATE_SUCCESS':
            return {loading:false,success:true,product:action.payload}
        case 'PRODUCT_CREATE_FAILS':
            return {loading:false,error:action.payload}
        case 'PRODUCT_CREATE_RESET':
            return {}
        default:
            return state
    }
}

export const productUpdateReducer=(state={product:{}},action)=>{
    switch(action.type){
        case 'PRODUCT_UPDATE_REQUEST':
            return {loading:true}
        case 'PRODUCT_UPDATE_SUCCESS':
            return {loading:false,success:true,product:action.payload}
        case 'PRODUCT_UPDATE_FAILS':
            return {loading:false,error:action.payload}
        case 'PRODUCT_UPDATE_RESET':
            return {product:{}}
        default:
            return state
    }
}

export const productReviewCreateReducer=(state={},action)=>{
    switch(action.type){
        case 'PRODUCT_CREATE_REVIEW_REQUEST':
            return {loading:true}
        case 'PRODUCT_CREATE_REVIEW_SUCCESS':
            return {loading:false,success:true}
        case 'PRODUCT_CREATE_REVIEW_FAILS':
            return {loading:false,error:action.payload}
        case 'PRODUCT_CREATE_REVIEW_RESET':
            return {}
        default:
            return state
    }
}

export const productTopReducer=(state={products:[]},action)=>{
    switch(action.type){
        case 'PRODUCT_TOP_REQUEST':
            return {loading:true}
        case 'PRODUCT_TOP_SUCCESS':
            return {loading:false,products:action.payload}
        case 'PRODUCT_TOP_FAILS':
            return {loading:false,error:action.payload}
        default:
            return state
    }
}