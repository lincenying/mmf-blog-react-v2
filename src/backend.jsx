import React from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import {configureCounterStore} from '~store'
import Root from './backend-router'

const store = configureCounterStore()

render(
    <AppContainer>
        <Root store={store} />
    </AppContainer>, document.getElementById('root')
)

if (module.hot) {
    module.hot.accept('./backend-router', () => {
        const RootContainer = require('./backend-router').default
        render(
            <AppContainer>
                <RootContainer store={store} />
            </AppContainer>, document.getElementById('root')
        )
    })
}
