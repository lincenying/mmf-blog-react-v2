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
    ['receiveAdminList']: (state, action) => {
        const {list, pathname, hasNext, hasPrev, page} = action
        let data
        if (page === 1) {
            data = [].concat(list)
        } else {
            data = state.toJS().lists.data.concat(list)
        }
        return state.mergeDeep({
            lists: {
                data, hasNext, hasPrev, page: page + 1, pathname
            }
        })
    },
    ['receiveAdminItem']: (state, {data, pathname}) => {
        return state.mergeDeep({
            item: {
                data,
                pathname
            }
        })
    },
    ['updateAdminItem']: (state, {item}) => {
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
    ['deleteAdmin']: (state, {id}) => {
        const {lists} = state.toJS()
        const obj = lists.data.find(ii => ii._id === id)
        if (obj) obj.is_delete = 1
        return state.mergeDeep({
            lists
        })
    },
    ['recoverAdmin']: (state, {id}) => {
        const {lists} = state.toJS()
        const obj = lists.data.find(ii => ii._id === id)
        if (obj) obj.is_delete = 0
        return state.mergeDeep({
            lists
        })
    }
}

export const getAdminList = config => {
    return async dispatch => {
        const { data: { data, code} } = await api.get('backend/admin/list', config)
        if (code === 200) {
            return dispatch({
                type: 'receiveAdminList',
                ...data,
                ...config
            })
        }
        return dispatch(errConfig)
    }
}
export const getAdminItem = config => {
    return async dispatch => {
        const { data: { data, code} } = await api.get('backend/admin/item', config)
        if (code === 200) {
            return dispatch({
                type: 'receiveAdminItem',
                data,
                ...config
            })
        }
        return dispatch(errConfig)
    }
}

export default createReducer(initStates, reducers)
