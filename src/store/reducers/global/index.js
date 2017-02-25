import toastr from 'toastr'
import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'

toastr.options.positionClass = 'toast-top-center'

const initStates = fromJS({
    message: {
        type: '',
        content: '',
        title: ''
    },
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

export const setMessage = config => {
    let content, type
    if (typeof config === 'string') {
        content = config
        type = 'error'
    } else {
        content = config.content
        type = config.type
    }
    toastr[type](content)
}

export default createReducer(initStates, reducers)

export const errConfig = {
    type: 'error',
    content: 'api 接口错误'
}
