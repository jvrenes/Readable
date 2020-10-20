import { getComments, changeCommentVoteToServer, deleteCommentToServer, addCommentToServer } from '../utils/api'

export const ADD_COMMENT = 'ADD_COMMENT'
export const RESET_COMMENTS = 'RESET_COMMENTS'


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

export function resetComments () {
    return  {
        type: RESET_COMMENTS
    }
}

export function handleUpdateScore(vote, id) {
    return (dispatch) => {
        return changeCommentVoteToServer(vote, id)
        .then((data) => dispatch(addComment(data)))
    }
}

export function handleDeleteComment(id) {
    console.log(id)
    return (dispatch) => {
        return deleteCommentToServer(id)
           .then((data) => dispatch(addComment(data)))
    }
}

export function handleAddComment (comment) {
    return (dispatch) => {
        return addCommentToServer(comment)
            .then((data) => dispatch(addComment(data)))
    }
}

function addComment (comment) {
    return {
        type: ADD_COMMENT,
        comment
    }
} 
