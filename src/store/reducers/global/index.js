import { fromJS } from 'immutable'
import cookies from 'js-cookie'
import { createReducer } from 'redux-immutablejs'

let userid = cookies.get('userid')
if (userid) userid = userid.replace('j:"', '').replace('"', '')

const initStates = fromJS({
    cookies: {
        b_user: cookies.get('b_user'),
        user: cookies.get('user'),
        userid,
        username: cookies.get('username'),
        useremail: cookies.get('useremail')
    },
    showLoginModal: false,
    showRegisterModal: false
})

const reducers = {
    ['setCookis']: (state, action) => {
        return state.mergeDeep({
            cookies: {
                b_user: action.b_user,
                user: action.user,
                userid: action.userid,
                username: action.username,
                useremail: action.useremail
            }
        })
    },
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

export const setCookis = config => {
    return async dispatch =>
        dispatch({
            type: 'setCookis',
            ...config
        })
}

export default createReducer(initStates, reducers)

export const errConfig = {
    type: 'error',
    content: 'api 接口错误'
}
