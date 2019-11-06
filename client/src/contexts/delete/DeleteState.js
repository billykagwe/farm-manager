import React,{useReducer} from 'react'
import deleteReducer from './deleteReducer'
import DeleteContext from './deleteContext'
import { SET_DELETE,REMOVE_DELETE } from '../types'

const DeleteState = ({children}) => {
    const initialState = null

    const [state,dispatch] = useReducer(deleteReducer,initialState)

    const setDelete = data => { 
        dispatch({
            type: SET_DELETE,
            payload: data
        })
    }

    const handleDelete = () => {
        state.confirm()
        dispatch({
            type: REMOVE_DELETE
        })
    }
    const removeDelete = () => {
        dispatch({
            type: REMOVE_DELETE
        })
    }

    return (
        <DeleteContext.Provider 
        value={{
            setDelete,
            delete: state,
            removeDelete,
            handleDelete
        }}
        >
            {children}
        </DeleteContext.Provider>
    )
}

export default DeleteState