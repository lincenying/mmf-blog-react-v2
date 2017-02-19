import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

export function configureCounterStore() {
    return applyMiddleware(thunk)(createStore)(reducers, {})
}
