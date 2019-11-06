import React,{useReducer} from 'react'
import productReducer from './productReducer'
import axios from 'axios'
import productContext from './productContext'
import {
    FETCH_PRODUCTS,
    ADD_PRODUCT,
    DELETE_PRODUCT,
    EDIT_PRODUCT,
    FETCH_PRODUCT,
    PRODUCT_ERROR,
    FILTER_PRODUCTS
} from '../types'

const ProductState = ({children}) => {
    const initialState = {
        products: null,
        selectedProduct: null,
        filteredProducts: null,
        error: null,
        loading: true
    }
    const [state,dispatch] = useReducer(productReducer,initialState)
    const {products,selectedProduct,error,loading,filteredProducts} = state

    const addProduct = async(productData) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            const res = await axios.post('/api/products',productData,config)
            dispatch({
                type: ADD_PRODUCT,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: PRODUCT_ERROR,
                payload: err.response.data.msg
            })
        }
        

    }
    const editProduct = async(productData) => {
        console.log(productData)
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const res = await axios.put(`/api/products/${productData.id}`,productData,config)
            console.log(res.data)
            dispatch({
                type: EDIT_PRODUCT,
                payload: res.data
            })
        } catch (err) {
            console.log(err)
            // dispatch({
            //     type: PRODUCT_ERROR,
            //     payload: err.response.data.msg
            // })
        }
    }
    const deleteProduct = async(id) => {
        try {
            const res = await axios.delete(`/api/products/${id}`)
            dispatch({
                type: DELETE_PRODUCT,
                payload: id
            })
        } catch (err) {
            dispatch({
                type: PRODUCT_ERROR,
                payload: err.response.data.msg
            })
        }
        
    }
    //get a single farmer by id
    const fetchProduct = async(id) => {
        const res = await axios.get(`/api/products/${id}`)
        dispatch({
            type: FETCH_PRODUCT,
            payload: res.data
        })
    }
    //get all farmers in the db
    const fetchProducts = async() => {
        try {
            const res = await axios.get('/api/products')
            console.log(res.data)
            dispatch({
                type:FETCH_PRODUCTS,
                payload: res.data
            })
        } catch (err) {
            console.log(err)
        }
    }

    const filterProducts = async(term) => {
        try {
            const res = await axios.get(`/api/products/${term}`)
            console.log(res.data)
            dispatch({
                type:FILTER_PRODUCTS,
                payload: res.data
            })
        } catch (err) {
            console.log(err)
        }
    }

   
    return (
        <productContext.Provider
            value={{
                products,
                selectedProduct,
                deleteProduct,
                error,
                loading,
                addProduct,
                fetchProducts,
                fetchProduct,
                filterProducts,
                filteredProducts,
                editProduct
            }}
        >
            {children}
        </productContext.Provider>
    )
}

export default ProductState