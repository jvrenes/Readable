import { TOGGLE_ORDER } from '../actions/order'

export default function order (state = 'byDate', action) {
    switch(action.type) {
        case TOGGLE_ORDER:
            return action.order
        default :
            return state   
    } 
}