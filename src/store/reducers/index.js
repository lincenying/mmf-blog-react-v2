import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import global from './global'
import topics from './frontend/topics'
import article from './frontend/article'
import trending from './frontend/trending'

export default combineReducers({
    global,
    article,
    topics,
    trending,
    routing: routerReducer,
})
