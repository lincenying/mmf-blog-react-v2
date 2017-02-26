import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'
import api from '~api'
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
        const {list, pathname, hasNext, hasPrev, page} = action
        let data
        if (page === 1) {
            data = [].concat(list)
        } else {
            data = state.toJS().lists.data.concat(list)
        }
        return state.merge({
            lists: {
                data, hasNext, hasPrev, page: page + 1, pathname
            }
        })
    },
    ['insertArticleItem']: (state, {item}) => {
        const { lists } = state.toJS()
        const data = [item].concat(lists.data)
        return state.mergeDeep({
            lists: {
                data
            }
        })
    },
    ['updateArticleItem']: (state, {item}) => {
        const { lists } = state.toJS()
        const index = lists.data.findIndex(ii => ii._id === item.id)
        if (index) lists.data[index] = item
        return state.mergeDeep({ lists })
    },
    ['deleteArticle']: (state, {id}) => {
        const { lists } = state.toJS()
        const obj = lists.data.find(ii => ii._id === id)
        if (obj) obj.is_delete = 1
        return state.mergeDeep({ lists })
    },
    ['recoverArticle']: (state, {id}) => {
        const { lists } = state.toJS()
        const obj = lists.data.find(ii => ii._id === id)
        if (obj) obj.is_delete = 0
        return state.mergeDeep({ lists })
    }
}

export const getArticleList = config => {
    return async dispatch => {
        const { data: { data, code} } = await api.get('backend/article/list', config)
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
        const { data: { code} } = await api.get('backend/article/delete', config)
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
        const { data: { code} } = await api.get('backend/article/recover', config)
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
