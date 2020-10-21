import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { getInitialData } from '../utils/api'
import { receiveCategories } from '../actions/categories'
import { addPost } from '../actions/posts'

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({categories, posts}) => {

                dispatch(receiveCategories(categories))
                
                posts.forEach(post => {
                    dispatch(addPost(post))
                })
                dispatch(hideLoading())
            })
    }
}