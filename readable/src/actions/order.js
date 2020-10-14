export const TOGGLE_ORDER = 'TOGGLE_ORDER'

export default function toggleOrder (order) {
    return {
        type: TOGGLE_ORDER,
        order
    }
    
}