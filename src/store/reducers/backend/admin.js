import { fromJS } from 'immutable'
import { createReducer } from 'redux-immutablejs'
import api from '~/api'
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
        const oldState = state.toJS()
        const { list, pathname, hasNext, hasPrev, page } = action
        let data
        if (page === 1) {
            data = [].concat(list)
        } else {
            data = oldState.lists.data.concat(list)
        }
        return state.merge({
            lists: {
                data,
                hasNext,
                hasPrev,
                page: page + 1,
                pathname
            },
            item: oldState.item
        })
    },
    ['receiveAdminItem']: (state, { data, pathname }) => {
        return state.mergeDeep({
            item: {
                data,
                pathname
            }
        })
    },
    ['updateAdminItem']: (state, { data }) => {
        const { lists } = state.toJS()
        const index = lists.data.findIndex(ii => ii._id === data._id)
        if (index > -1) {
            lists.data.splice(index, 1, data)
        }
        return state.set('lists', lists)
    },
    ['deleteAdmin']: (state, { id }) => {
        const { lists } = state.toJS()
        const obj = lists.data.find(ii => ii._id === id)
        if (obj) obj.is_delete = 1
        return state.set('lists', lists)
    },
    ['recoverAdmin']: (state, { id }) => {
        const { lists } = state.toJS()
        const obj = lists.data.find(ii => ii._id === id)
        if (obj) obj.is_delete = 0
        return state.set('lists', lists)
    }
}

export const getAdminList = config => {
    return async dispatch => {
        const { code, data } = await api.get('backend/admin/list', config)
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
        const { code, data } = await api.get('backend/admin/item', config)
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
