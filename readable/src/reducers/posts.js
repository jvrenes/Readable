
import { RECEIVE_POSTS, ADD_POST, DELETE_POST } from '../actions/posts'

export default function posts (state = {}, action) {
    switch(action.type) {
        // case RECEIVE_POSTS:
        //     const { posts } = action
        //     return {
        //         ...state,
        //         [posts.id]: posts
        //     }
        case ADD_POST:
            return {
                ...state,
                [action.post.id]: action.post,
            }
        case DELETE_POST:
            return {
                ...state,
                [action.post.id]: {
                    ...state[action.post.id],
                    deleted: true
                }
            }
        default:
            return state
    }
}
