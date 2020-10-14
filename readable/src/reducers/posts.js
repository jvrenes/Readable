
import { RECEIVE_POSTS, ADD_POST } from '../actions/posts'

export default function posts (state = {}, action) {
    switch(action.type) {
        case RECEIVE_POSTS:
            const { posts } = action
            return {
                ...state,
                ...posts
            }
        case ADD_POST:
            return {
                ...state,
                [action.post.id]: action.post,
            }

        default:
            return state
    }
}
