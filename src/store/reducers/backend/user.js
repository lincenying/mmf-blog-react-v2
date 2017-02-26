import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'
import api from '~api'
import { errConfig } from '../global'

const initStates = fromJS({
    lists: {
        hasNext: false,
        hasPrev: false,
        pathname: '',
        page: 1,
        data: []
    },
    item: {
        data: {},
        pathname: ''
    }
})

const reducers = {
    ['receiveUserList']: (state, action) => {
        const oldState = state.toJS()
        const {list, pathname, hasNext, hasPrev, page} = action
        let data
        if (page === 1) {
            data = [].concat(list)
        } else {
            data = oldState.lists.data.concat(list)
        }
        return state.merge({
            lists: {
                data, hasNext, hasPrev, page: page + 1, pathname
            },
            item: oldState.item
        })
    },
    ['receiveUserItem']: (state, {data, pathname}) => {
        return state.mergeDeep({
            item: {
                data,
                pathname
            }
        })
    },
    ['updateUserItem']: (state, {item}) => {
        const {lists} = state.toJS()
        const obj = lists.data.find(ii => ii._id === item.id)
        if (obj) {
            obj.username = item.username
            obj.email = item.email
        }
        return state.mergeDeep({
            lists,
            item
        })
    },
    ['deleteUser']: (state, {id}) => {
        const {lists} = state.toJS()
        const obj = lists.data.find(ii => ii._id === id)
        if (obj) obj.is_delete = 1
        return state.mergeDeep({
            lists
        })
    },
    ['recoverUser']: (state, {id}) => {
        const {lists} = state.toJS()
        const obj = lists.data.find(ii => ii._id === id)
        if (obj) obj.is_delete = 0
        return state.mergeDeep({
            lists
        })
    }
}

export const getUserList = config => {
    return async dispatch => {
        const { data: { data, code} } = await api.get('backend/user/list', config)
        if (code === 200) {
            return dispatch({
                type: 'receiveUserList',
                ...data,
                ...config
            })
        }
        return dispatch(errConfig)
    }
}
export const getUserItem = config => {
    return async dispatch => {
        const { data: { data, code} } = await api.get('backend/user/item', config)
        if (code === 200) {
            return dispatch({
                type: 'receiveUserItem',
                data,
                ...config
            })
        }
        return dispatch(errConfig)
    }
}

export default createReducer(initStates, reducers)
