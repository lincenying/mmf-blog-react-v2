import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import global from './global'
import category from './global/category'
import comment from './global/comment'
import topics from './frontend/topics'
import article from './frontend/article'
import trending from './frontend/trending'
import backendAdmin from './backend/admin'
import backendArticle from './backend/article'
import backendUser from './backend/user'

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
    routing: routerReducer,
})
