export const SELECT_CATEGORY = 'SELECT_CATEGORY'

export default function selectCategory (category) {
    return {
        type: SELECT_CATEGORY,
        category
    }
}