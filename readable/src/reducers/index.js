import { combineReducers } from 'redux'

import { loadingBarReducer } from 'react-redux-loading-bar'

import  categories  from './categories'
import posts from './posts'
import order from './order'


export default combineReducers({
    categories,
    posts,
    order,
    loadingBar: loadingBarReducer
})