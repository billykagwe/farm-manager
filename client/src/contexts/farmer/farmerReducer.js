import {
    ADD_FARMER,
    DELETE_FARMER,
    EDIT_FARMER,
    FARMER_ERROR,
    FETCH_FARMER,
    FETCH_FARMERS,
    ISSUE_IMPREST,
    DELETE_IMPREST,
    EDIT_IMPREST,
    FILTER_FARMER
} from '../types'

export default (state,action) => {
    switch(action.type){
        case ADD_FARMER:
            return {
                ...state, 
                farmers: [action.payload,...state.farmers],
                loading: false
            }
        case FETCH_FARMERS:
            return {
                ...state, 
                farmers: action.payload,
                filteredFarmers: null,
                loading: false
            }
        case FETCH_FARMER:
            return{
                ...state,
                selectedFarmer: action.payload
            }
        case FILTER_FARMER:
            return{
                ...state,
                filteredFarmers: action.payload
            }
        case ISSUE_IMPREST:
            let farmer = {...state.selectedFarmer}
            farmer.imprest.push(action.payload)
            console.log(farmer)
            return{
                ...state,
                selectedFarmer: farmer,
                loading:false
            }
        case EDIT_IMPREST:
            let updatedImprest = {...state.selectedFarmer}.imprest.map(imp => imp._id == action.payload._id ? action.payload : imp)
            
            return{
                ...state,
                selectedFarmer: {...state.selectedFarmer,imprest: updatedImprest},
                loading:false
            }
        case DELETE_IMPREST:
            const filteredImprest = {...state.selectedFarmer}.imprest.filter(imp => imp._id !== action.payload)
            return{
                ...state,
                selectedFarmer:{...state.selectedFarmer,imprest: filteredImprest},
                loading: false
            }
        case DELETE_FARMER:
            return{
                ...state,
                farmers: state.farmers.filter(farmer => farmer._id !== action.payload),
                loading:false
            }
        case EDIT_FARMER:
            return{
                ...state,
                farmers: state.farmers.map(farmer => farmer._id === action.payload._id ? action.payload : farmer),
                loading: false
            }
        default:
            return state
    }
}