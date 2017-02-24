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
    },
    ['updateArticleLikeState']: state => {
        const like_status = state.data.like_status
        return state.merge({
            data: {
                like_status: !like_status,
                like: like_status ? state.data.like - 1 : state.data.like + 1
            }
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
