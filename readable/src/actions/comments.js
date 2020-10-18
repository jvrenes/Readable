import { getComments } from '../utils/api'

export const ADD_COMMENT = 'ADD_COMMENT'


export const handleComments = (id) => {
    return (dispatch) => {
        getComments(id)
            .then((comments) => {
                comments.forEach((comment) => {
                    dispatch(addComment(comment))
                })
            })
    }
}

function addComment (comment) {
    return {
        type: ADD_COMMENT,
        comment
    }
} 