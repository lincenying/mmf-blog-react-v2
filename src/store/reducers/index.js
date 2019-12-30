import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import backendAdmin from './backend/admin'
import backendArticle from './backend/article'
import backendUser from './backend/user'
import article from './frontend/article'
import topics from './frontend/topics'
import trending from './frontend/trending'
import global from './global'
import category from './global/category'
import comment from './global/comment'

export default combineReducers({
    global,
    comment,
    article,
    topics,
    trending,
    category,
    backendAdmin,
    backendArticle,
    backendUser,
    routing: routerReducer
})
