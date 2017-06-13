import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { configureCounterStore } from '~store'
import Root from './pages/backend'

const store = configureCounterStore()

render(
    <AppContainer>
        <Provider store={store}>
            <Root />
        </Provider>
    </AppContainer>, document.getElementById('root')
)

if (module.hot) {
    module.hot.accept('./pages/backend', () => {
        const RootContainer = require('./pages/backend').default
        render(
            <AppContainer>
                <Provider store={store}>
                    <RootContainer />
                </Provider>
            </AppContainer>, document.getElementById('root')
        )
    })
}
