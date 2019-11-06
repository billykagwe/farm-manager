import React,{useReducer} from 'react'
import axios from 'axios'
import farmerReducer from './farmerReducer'
import FarmerContext from './farmerContext'
import {
    FETCH_FARMERS,
    ADD_FARMER,
    DELETE_FARMER,
    EDIT_FARMER,
    FETCH_FARMER,
    FARMER_ERROR,
    ISSUE_IMPREST,
    DELETE_IMPREST,
    EDIT_IMPREST,
    FILTER_FARMER
} from '../types'

const FarmerState = ({children}) => {
    const initialState = {
        farmers: null,
        filteredFarmers: null,
        selectedFarmer: null,
        error: null,
        loading: true
    }
    const [state,dispatch] = useReducer(farmerReducer,initialState)
    const {farmers,selectedFarmer,error,loading,filteredFarmers} = state

    const addFarmer = async(farmerData) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            const res = await axios.post('/api/farmers',farmerData,config)
            dispatch({
                type: ADD_FARMER,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: FARMER_ERROR,
                payload: err.response.data.msg
            })
        }
        

    }
    const editFarmer = async(farmerData) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const res = await axios.put(`/api/farmers/${farmerData.id}`,farmerData,config)
            console.log(res.data)
            dispatch({
                type: EDIT_FARMER,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: FARMER_ERROR,
                payload: err.response.data.msg
            })
        }
    }
    const deleteFarmer = async(id) => {
        try {
            const res = await axios.delete(`/api/farmers/${id}`)
            dispatch({
                type: DELETE_FARMER,
                payload: id
            })
        } catch (err) {
            dispatch({
                type: FARMER_ERROR,
                payload: err.response.data.msg
            })
        }
        
    }
    //get a single farmer by id
    const fetchFarmer = async(id) => {
        const res = await axios.get(`/api/farmers/farmer/${id}`)
        dispatch({
            type: FETCH_FARMER,
            payload: res.data
        })
    }
    //get all farmers in the db
    const fetchFarmers = async() => {
        try {
            const res = await axios.get('/api/farmers')
            
            dispatch({
                type:FETCH_FARMERS,
                payload: res.data
            })
        } catch (err) {
            console.log(err)
        }
    }

    const filterFarmers = async(term) => {
        try {
            const res = await axios.get(`/api/farmers/${term}`)
            dispatch({
                type: FILTER_FARMER,
                payload: res.data
            })
        
        } catch (err) {
            console.log(err)
        }
    }

    const issueImprest = async(imprestData) => {
      
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post(`/api/farmers/imprest/${imprestData.farmerId}`,imprestData,config)

        dispatch({
            type: ISSUE_IMPREST,
            payload: res.data
        })
    }

    const editImprest = async(imprestData) => {
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put(`/api/farmers/imprest/${imprestData.farmerId}`,imprestData,config)
       
        dispatch({
            type: EDIT_IMPREST,
            payload: res.data
        })
    }

    const deleteImprest = async(farmer,imprest) => {
        await axios.delete(`/api/farmers/imprest/${farmer}/${imprest}`)
        dispatch({
            type: DELETE_IMPREST,
            payload: imprest
        })
    }

    return (
        <FarmerContext.Provider
            value={{
                farmers,
                selectedFarmer,
                deleteFarmer,
                error,
                loading,
                addFarmer,
                fetchFarmers,
                fetchFarmer,
                editFarmer,
                issueImprest,
                deleteImprest,
                editImprest,
                filterFarmers,
                filteredFarmers
            }}
        >
            {children}
        </FarmerContext.Provider>
    )
}

export default FarmerState