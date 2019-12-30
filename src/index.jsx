import { configureCounterStore } from '@store'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import Root from './pages/app'

const store = configureCounterStore()

render(
    <AppContainer>
        <Provider store={store}>
            <Router>
                <Root />
            </Router>
        </Provider>
    </AppContainer>,
    document.getElementById('root')
)

if (module.hot) {
    module.hot.accept('./pages/app', () => {
        const RootContainer = require('./pages/app').default
        render(
            <AppContainer>
                <Provider store={store}>
                    <Router>
                        <RootContainer />
                    </Router>
                </Provider>
            </AppContainer>,
            document.getElementById('root')
        )
    })
}
