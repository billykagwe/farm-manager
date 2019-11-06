import {
    FETCH_ADVANCES,
    ADD_ADVANCE,
    DELETE_ADVANCE,
    EDIT_ADVANCE,
    FETCH_ADVANCE,
    FETCH_FARMER_ADVANCES,
    FILTER_ADVANCES,
    ADVANCE_ERROR
} from '../types'

export default (state,action) => {
    switch(action.type){
        case ADD_ADVANCE:
            return {
                ...state, 
                advances: [action.payload,...state.advances],
                loading: false
            }
        case FETCH_ADVANCES:
            return {
                ...state, 
                advances: action.payload,
                loading: false
            }
        case FILTER_ADVANCES:
            return {
                ...state, 
                filteredAdvances: action.payload,
                loading: false
            }
        case FETCH_ADVANCE:
            return{ 
                ...state,
                selectedAdvance: action.payload,
                loading:false
            }
        case DELETE_ADVANCE:
            return{
                ...state,
                advances: state.advances.filter(advance => advance._id !== action.payload),
                loading:false
            }
        case EDIT_ADVANCE:
            return{
                ...state,
                advances: state.advances.map(advance => advance._id === action.payload._id ? action.payload : advance),
                loading: false
            }
        case FETCH_FARMER_ADVANCES:
            return{
                ...state,
                farmerAdvance: action.payload,
                loading: false
            }
        default:
            return state
    }
}