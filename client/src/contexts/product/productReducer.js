import {
    ADD_PRODUCT,
    DELETE_PRODUCT,
    EDIT_PRODUCT,
    PRODUCT_ERROR,
    FILTER_PRODUCTS,
    FETCH_PRODUCT,
    FETCH_PRODUCTS
} from '../types'

export default (state,action) => {
    switch(action.type){
        case ADD_PRODUCT:
            return {
                ...state, 
                products: [action.payload,...state.products],
                loading: false
            }
        case FETCH_PRODUCTS:
            return {
                ...state, 
                products: action.payload,
                loading: false
            }
        case FILTER_PRODUCTS:
            return {
                ...state, 
                filteredProducts: action.payload,
                loading: false
            }
        case FETCH_PRODUCT:
            return{
                ...state,
                products: state.products.map(product => product._id === action.payload._id ? action.payload : product),
                loading:false
            }
        case DELETE_PRODUCT:
            return{
                ...state,
                products: state.products.filter(product => product._id !== action.payload),
                loading:false
            }
        case EDIT_PRODUCT:
            return{
                ...state,
                products: state.products.map(product => product._id === action.payload._id ? action.payload : product),
                loading: false
            }
        default:
            return state
    }
}