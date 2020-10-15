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