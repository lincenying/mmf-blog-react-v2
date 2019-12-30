import DevTools from '@devtools'
import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from './reducers'

const logger = createLogger()
export function configureCounterStore(initialState) {
    const middleware = [thunk, logger]
    const enhancers = []
    const store = createStore(
        reducers,
        initialState,
        compose(
            applyMiddleware(...middleware),
            DevTools.instrument(),
            ...enhancers
        )
    )
    if (module.hot) {
        module.hot.accept('./reducers', () => store.replaceReducer(require('./reducers').default))
    }
    return store
}
