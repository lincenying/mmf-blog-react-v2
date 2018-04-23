import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'

const initStates = fromJS({
    showLoginModal: false,
    showRegisterModal: false
})

const reducers = {
    ['showLoginModal']: (state, action) => {
        return state.mergeDeep({
            showLoginModal: action.payload
        })
    },
    ['showRegisterModal']: (state, action) => {
        return state.mergeDeep({
            showRegisterModal: action.payload
        })
    }
}

export default createReducer(initStates, reducers)

export const errConfig = {
    type: 'error',
    content: 'api 接口错误'
}
