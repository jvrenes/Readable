import { addPostToServer } from '../utils/api'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'



export function receivePosts (posts) {
    return {
        type: RECEIVE_POSTS,
        posts
    }
}

export function handleAddPost(post) {
    console.log(post)
    return (dispatch) => {
        return addPostToServer(post)
            .then(() => {
                dispatch(addPost(post))
            })
    }
}

function addPost (post) {
    return {
        type: ADD_POST,
        post
    }
}