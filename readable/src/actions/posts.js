import { addPostToServer, changeVoteToServer, deletePostToServer, getPost, modifyPostToServer } from '../utils/api'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
export const UPDATE_VOTE = 'UPDATE_VOTE'
export const DELETE_POST = 'DELETE_POST'



export function receivePosts (posts) {
    return {
        type: RECEIVE_POSTS,
        posts
    }
}

export function handleAddPost(post) {
    return (dispatch) => {
        return addPostToServer(post)
            .then((res) => {
                dispatch(addPost(res))
            })
    }
}

function addPost (post) {
    return {
        type: ADD_POST,
        post
    }
}

export function handleChangeVote (vote, id) {
    return (dispatch) => {
        return changeVoteToServer(vote, id)
        .then((data) => {
            console.log(data)
            dispatch(addPost(data))
        })
        .catch(err => {
            console.log("Error: ", err)
            alert("I am an alert box!")
        })
    }
}

export function handleDeletePost (post) {
    return (dispatch) => {
        console.log("DLETING POST: ", post)
        dispatch(deletePost(post))
        return deletePostToServer(post.id)
            .catch((err) => {
                console.log(err)
                dispatch(addPost(post))
            })
    }
}

function deletePost (post) {
    return {
        type: DELETE_POST,
        post
    }
}

export function handleModifyPost (post) {
    return (dispatch) => {
        return modifyPostToServer(post)
        .catch((err) => alert("There was an error modufying the post. Try again"))
        .then((data) => dispatch(addPost(data)))
    }
}

export function handleGetPost (id) {
    return (dispatch) => {
        return getPost(id)
            .catch((err) => alert("There was an error getting the post from server"))
            .then((data) => {
                console.log(data)
                dispatch(addPost(data))
            })
    }
}