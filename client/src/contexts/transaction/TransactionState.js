import React,{useReducer} from 'react'
import axios from 'axios'
import transactionReducer from './transactionReducer'
import TransactionContext from './transactionContext'
import {
    FETCH_TRANSACTIONS,
    ADD_TRANSACTION,
    DELETE_TRANSACTION,
    EDIT_TRANSACTION,
    FETCH_TRANSACTION,
    FETCH_FARMER_TRANSACTIONS,
    TRANSACTION_ERROR
} from '../types'

const TransactionState = ({children}) => {
    const initialState = {
        transactions: null,
        selectedTransaction: null,
        error: null,
        farmerTransaction:null,
        loading: true
    }
    const [state,dispatch] = useReducer(transactionReducer,initialState)
    const {transactions,selectedTransaction,error,loading,farmerTransaction} = state

    const addTransaction = async(transactionData) => {
        console.log(transactionData)
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
             
            const res = await axios.post('/api/transactions',transactionData,config)
            dispatch({
                type: ADD_TRANSACTION,
                payload: res.data
            })
        } catch (err) {
            console.log(err)
        }
        

    }
    const editTransaction = async(transactionData) => {
        console.log(transactionData)
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const res = await axios.put(`/api/transactions/${transactionData.id}`,transactionData,config)
            dispatch({
                type: EDIT_TRANSACTION,
                payload: res.data
            })
        } catch (err) {
            console.log(err)
        }
    }
    const deleteTransaction = async(id,farmer) => {
        try {
            const res = await axios.delete(`/api/transactions/${id}/${farmer}`)
            console.log('te')
            dispatch({
                type: DELETE_TRANSACTION,
                payload: id
            })
        } catch (err) {
            dispatch({
                type: TRANSACTION_ERROR,
                payload: err.response.data.msg
            })
        }
        
    }
    //get a single transaction by id
    const fetchTransaction = async(id) => {
        const res = await axios.get(`/api/transactions/${id}`)
        dispatch({
            type: FETCH_TRANSACTION,
            payload: res.data
        })
    }
    //get all transactions by a farmer
    const fetchFarmerTransactions = async(id) => {
        const res = await axios.get(`/api/transactions/filter/${id}`)
        console.log(res.data)
        dispatch({
            type: FETCH_FARMER_TRANSACTIONS,
            payload: res.data
        })
    }
    //get all transactions in the db
    const fetchTransactions = async() => {
        try {
            const res = await axios.get('/api/transactions')
            console.log(res.data)
            dispatch({
                type:FETCH_TRANSACTIONS,
                payload: res.data
            })
        } catch (err) {
            console.log(err)
            // dispatch({
            //     type: TRANSACTION_ERROR,
            //     payload: err.response.data.msg
            // })
        }
    }

      //get all transactions in the db
      const filterTransactions = async(date) => {
        try {
            const res = await axios.get(`/api/transactions/date/${date}`)
            console.log(res.data)
            dispatch({
                type:FETCH_TRANSACTIONS,
                payload: res.data
            })
        } catch (err) {
            console.log(err)
            // dispatch({
            //     type: TRANSACTION_ERROR,
            //     payload: err.response.data.msg
            // })
        }
    }

   
    return (
        <TransactionContext.Provider
            value={{
                transactions,
                filterTransactions,
                selectedTransaction,
                fetchFarmerTransactions,
                deleteTransaction,
                error,
                loading,
                addTransaction,
                fetchTransactions,
                fetchTransaction,
                editTransaction,
                farmerTransaction
            }}
        >
            {children}
        </TransactionContext.Provider>
    )
}

export default TransactionState