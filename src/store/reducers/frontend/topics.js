import { fromJS } from 'immutable'
import { createReducer } from 'redux-immutablejs'
import api from '~/api'
import { errConfig } from '../global'

const initStates = fromJS({
    data: [],
    hasNext: 0,
    page: 1,
    pathname: ''
})

const reducers = {
    ['receiveTopics']: (state, action) => {
        const { list, hasNext, page, pathname } = action
        const lists = page === 1 ? [].concat(list) : state.toJS().data.concat(list)
        return state.merge({
            data: lists,
            hasNext,
            page,
            pathname
        })
    },
    ['updateTopicsLikeState']: (state, action) => {
        const { payload } = action
        const data = state.toJS().data
        const obj = data.find(item => item._id === payload)
        if (obj) {
            obj.like = obj.like_status ? obj.like - 1 : obj.like + 1
            obj.like_status = !obj.like_status
        }
        return state.set('data', data)
    }
}

export const getTopics = config => {
    return async dispatch => {
        const { code, data } = await api.get('frontend/article/list', config)
        if (code === 200) {
            return dispatch({
                type: 'receiveTopics',
                ...data,
                ...config
            })
        }
        return dispatch(errConfig)
    }
}

export default createReducer(initStates, reducers)
