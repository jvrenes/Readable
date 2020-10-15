import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { getInitialData } from '../utils/api'
import { receiveCategories } from '../actions/categories'
import { receivePosts } from '../actions/posts'

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({categories, posts}) => {

                dispatch(receiveCategories(categories))
                
                posts.forEach(post => {
                    dispatch(receivePosts(post))
                })
                dispatch(hideLoading())
            })
    }
}