import {
LOGIN_FAIL,
LOGIN_SUCCESS,
LOGOUT,
LOADUSER_FAIL,
LOADUSER_SUCCESS,
CLEAR_ERRORS
}from '../types'


export default (state,action) => {
    switch(action.type){
        case LOADUSER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading:false
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
        case LOGIN_FAIL:
        case LOGOUT:
        case LOADUSER_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: action.payload,
                loading:false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}