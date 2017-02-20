import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'
import api from '~api'
import { errConfig } from '../global'

const initStates = fromJS({
    data: [],
    hasNext: 0,
    page: 1,
    pathname: ''
})

const reducers = {
    ['receiveTopics']: (state, action) => {
        const {list, hasNext, page, pathname} = action
        const lists = page === 1 ? [].concat(list) : state.toJS().data.concat(list)
        return state.merge({
            data: lists,
            hasNext,
            page,
            pathname
        })
    }
}

export const getTopics = config => {
    return async dispatch => {
        const { data: { data, code} } = await api.get('frontend/article/list', config)
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
