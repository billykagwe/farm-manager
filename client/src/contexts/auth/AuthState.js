import React,{useReducer} from 'react'
import AuthContext from './authContext'
import authReducer from './authReducer'
import axios from 'axios'
import setAuthHeader from '../../utils/authHeader'

import {
LOGIN_SUCCESS,
LOGIN_FAIL,
LOGOUT,
LOADUSER_FAIL,
LOADUSER_SUCCESS,
CLEAR_ERRORS
} from '../types'

const AuthState = ({children}) => {
    const initialState = {
        token: localStorage.token,
        isAuthenticated: false,
        user: null,
        error: null,
        loading: true
    }

    const [state,dispatch] = useReducer(authReducer,initialState)

    const loadUser = async() => {
        if(localStorage.token){
            setAuthHeader(localStorage.token)
        }
        try {
            const res = await axios.get('/api/auth')
            dispatch({
                type: LOADUSER_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: LOADUSER_FAIL,
                payload: err.response.data.msg
            })
        }
        
    }

    const login = async(formData) => {
        const config = {
            headers:{
                "Content-Type": "application/json"
            }
        }
        try {
            const res = await axios.post('/api/auth/login',formData,config)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            loadUser()
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg
            })
        }
        
    }
    const register = async(formData) => {
        const config = {
            headers:{
                "Content-Type": "application/json"
            }
        }
        try {
            const res = await axios.post('/api/auth/register',formData,config)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            loadUser()
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg
            })
        }
        
    }

    const logout = () => {
        dispatch({
            type: LOGOUT,
        })
    }

    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS
        })
    }
    

    return(
        <AuthContext.Provider value={{
            login,
            logout,
            clearErrors,
            loadUser,
            register,
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            user: state.user,
            error: state.error,
            loading: state.loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthState