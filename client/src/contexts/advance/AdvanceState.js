import React,{useReducer} from 'react'
import axios from 'axios'
import advanceReducer from './advanceReducer'
import AdvanceContext from './advanceContext'
import {
    FETCH_ADVANCES,
    ADD_ADVANCE,
    DELETE_ADVANCE,
    EDIT_ADVANCE,
    FETCH_ADVANCE,
    FILTER_ADVANCES,
    FETCH_FARMER_ADVANCES,
    ADVANCE_ERROR
} from '../types'

const AdvanceState = ({children}) => {
    const initialState = {
        advances: [],
        filteredAdvances: [],
        selectedAdvance: null,
        error: null,
        farmerAdvance:null,
        loading: true
    }
    const [state,dispatch] = useReducer(advanceReducer,initialState)
    const {advances,selectedAdvance,error,loading,farmerAdvance,filteredAdvances} = state

    const addAdvance = async(advanceData) => {
      
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            
            const res = await axios.post('/api/advances',advanceData,config)
            dispatch({
                type: ADD_ADVANCE,
                payload: res.data
            })
        } catch (err) {
            console.log(err)
        }
        

    }
    const editAdvance = async(advanceData) => {
      
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const res = await axios.put(`/api/advances/${advanceData.id}`,advanceData,config)
            dispatch({
                type: EDIT_ADVANCE,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: ADVANCE_ERROR,
                payload: err.response.data.msg
            })
        }
    }
    const deleteAdvance = async(id) => {
        try {
        
            const res = await axios.delete(`/api/advances/${id}`)
            console.log('te')
            dispatch({
                type: DELETE_ADVANCE,
                payload: id
            })
        } catch (err) {
            dispatch({
                type: ADVANCE_ERROR,
                payload: err.response.data.msg
            })
        }
        
    }
    //get a single advance by id
    const fetchAdvance = async(id) => {
        const res = await axios.get(`/api/advances/${id}`)
        dispatch({
            type: FETCH_ADVANCE,
            payload: res.data
        })
    }
    //get all advances by a farmer
    const fetchFarmerAdvances = async(id) => {
        const res = await axios.get(`/api/advances/filter/${id}`)
        
        dispatch({
            type: FETCH_FARMER_ADVANCES,
            payload: res.data
        })
    }
    //get all advances in the db
    const fetchAdvances = async() => {
        try {
            const res = await axios.get('/api/advances')

            dispatch({
                type:FETCH_ADVANCES,
                payload: res.data
            })
        } catch (err) {
            console.log(err)
            // dispatch({
            //     type: advance_ERROR,
            //     payload: err.response.data.msg
            // })
        }
    }

     //get all advances in the db
     const filterAdvances = async(date) => {
         if(!date){
            dispatch({
                type:FILTER_ADVANCES,
                payload: []
            })
            return;
         }
        try {
          
            const res = await axios.get(`/api/advances/date/${date}`)
           
            dispatch({
                type:FILTER_ADVANCES,
                payload: res.data
            })
        } catch (err) {
            console.log(err)
            // dispatch({
            //     type: advance_ERROR,
            //     payload: err.response.data.msg
            // })
        }
    }

   
    return (
        <AdvanceContext.Provider
            value={{
                advances,
                filteredAdvances,
                selectedAdvance,
                fetchFarmerAdvances,
                filterAdvances,
                deleteAdvance,
                error,
                loading,
                addAdvance,
                fetchAdvances,
                fetchAdvance,
                editAdvance,
                farmerAdvance
            }}
        >
            {children}
        </AdvanceContext.Provider>
    )
}

export default AdvanceState