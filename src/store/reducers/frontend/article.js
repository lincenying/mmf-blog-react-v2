import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'
import api from '~api'
import { errConfig } from '../global'

const initStates = fromJS({
    data: {},
    pathname: '',
    isLoad: false
})

const reducers = {
    ['receiveArticleItem']: (state, action) => {
        const {data, pathname} = action
        return state.merge({
            data,
            pathname,
            isLoad: true
        })
    }
}

export const getArticleItem = config => {
    return async dispatch => {
        const { data: { data, code} } = await api.get('frontend/article/item', config)
        if (code === 200) {
            return dispatch({
                type: 'receiveArticleItem',
                data,
                ...config
            })
        }
        return dispatch(errConfig)
    }
}

export default createReducer(initStates, reducers)
