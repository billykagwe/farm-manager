import {SET_DELETE,REMOVE_DELETE} from '../types'

export default (state,action) => {
    switch(action.type){
        case SET_DELETE: 
            return action.payload
        case REMOVE_DELETE:
            return null
        default:
            return state
    }
}