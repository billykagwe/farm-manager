import {
    ADD_TRANSACTION,
    DELETE_TRANSACTION,
    EDIT_TRANSACTION,
    TRANSACTION_ERROR,
    FETCH_FARMER_TRANSACTIONS,
    FETCH_TRANSACTION,
    FETCH_TRANSACTIONS
} from '../types'

export default (state,action) => {
    switch(action.type){
        case ADD_TRANSACTION:
            return {
                ...state, 
                farmerTransaction: [action.payload,...state.farmerTransaction],
                loading: false
            }
        case FETCH_TRANSACTIONS:
            return {
                ...state, 
                transactions: action.payload,
                loading: false
            }
        case FETCH_TRANSACTION:
            return{
                ...state,
                selectedTransaction: [...action.payload],
                loading:false
            }
        case DELETE_TRANSACTION:
            return{
                ...state,
                farmerTransaction: state.farmerTransaction.filter(transaction => transaction._id !== action.payload),
                loading:false
            }
        case EDIT_TRANSACTION:
            console.log(action.payload)
            return{
                ...state,
                farmerTransaction: state.farmerTransaction.map(transaction => transaction._id === action.payload._id ? action.payload : transaction),
                loading: false
            }
        case FETCH_FARMER_TRANSACTIONS:
            return{
                ...state,
                farmerTransaction: action.payload,
                loading: false
            }
        default:
            return state
    }
}