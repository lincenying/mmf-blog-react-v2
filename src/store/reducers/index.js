import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import global from './global'
import article from './article'
import topics from './topics'

export default combineReducers({
    global,
    article,
    topics,
    routing: routerReducer,
})
