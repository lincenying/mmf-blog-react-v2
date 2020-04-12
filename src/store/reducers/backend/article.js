import { fromJS } from 'immutable'
import { createReducer } from 'redux-immutablejs'
import api from '~/api'
import { errConfig } from '../global'

const initStates = fromJS({
    lists: {
        data: [],
        path: '',
        hasNext: 0,
        hasPrev: 0,
        page: 1
    }
})

const reducers = {
    ['receiveBackendArticleList']: (state, action) => {
        const { list, pathname, hasNext, hasPrev, page } = action
        let data
        if (page === 1) {
            data = [].concat(list)
        } else {
            data = state.toJS().lists.data.concat(list)
        }
        return state.merge({
            lists: {
                data,
                hasNext,
                hasPrev,
                page: page + 1,
                pathname
            }
        })
    },
    ['insertArticleItem']: (state, { item }) => {
        const { lists } = state.toJS()
        const data = [item].concat(lists.data)
        return state.mergeDeep({
            lists: {
                data
            }
        })
    },
    ['updateArticleItem']: (state, { data }) => {
        const { lists } = state.toJS()
        const index = lists.data.findIndex(ii => ii._id === data._id)
        if (index > -1) lists.data[index] = data
        return state.set('lists', lists)
    },
    ['deleteArticle']: (state, { id }) => {
        const { lists } = state.toJS()
        const obj = lists.data.find(ii => ii._id === id)
        if (obj) obj.is_delete = 1
        return state.set('lists', lists)
    },
    ['recoverArticle']: (state, { id }) => {
        const { lists } = state.toJS()
        const obj = lists.data.find(ii => ii._id === id)
        if (obj) obj.is_delete = 0
        return state.set('lists', lists)
    }
}

export const getArticleList = config => {
    return async dispatch => {
        const { code, data } = await api.get('backend/article/list', config)
        if (code === 200) {
            return dispatch({
                type: 'receiveBackendArticleList',
                ...data,
                ...config
            })
        }
        return dispatch(errConfig)
    }
}

export const deleteArticle = config => {
    return async dispatch => {
        const { code } = await api.get('backend/article/delete', config)
        if (code === 200) {
            return dispatch({
                type: 'deleteArticle',
                ...config
            })
        }
        return dispatch(errConfig)
    }
}
export const recoverArticle = config => {
    return async dispatch => {
        const { code } = await api.get('backend/article/recover', config)
        if (code === 200) {
            return dispatch({
                type: 'recoverArticle',
                ...config
            })
        }
        return dispatch(errConfig)
    }
}

export default createReducer(initStates, reducers)
