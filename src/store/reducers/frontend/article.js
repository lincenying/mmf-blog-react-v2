import { fromJS } from 'immutable'
import { createReducer } from 'redux-immutablejs'
import api from '~/api'
import { errConfig } from '../global'

const initStates = fromJS({
    data: {},
    pathname: '',
    isLoad: false
})

const reducers = {
    ['receiveArticleItem']: (state, action) => {
        const { data, pathname } = action
        return state.merge({
            data,
            pathname,
            isLoad: true
        })
    },
    ['updateArticleLikeState']: state => {
        const { like, like_status } = state.toJS().data
        return state.mergeDeep({
            data: {
                like_status: !like_status,
                like: like_status ? like - 1 : like + 1
            }
        })
    }
}

export const getArticleItem = config => {
    return async dispatch => {
        const { code, data } = await api.get('frontend/article/item', config)
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
