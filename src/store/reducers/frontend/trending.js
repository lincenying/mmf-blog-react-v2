import { fromJS } from 'immutable'
import { createReducer } from 'redux-immutablejs'
import api from '~/api'
import { errConfig } from '../global'

const initStates = fromJS({
    data: []
})

const reducers = {
    ['receiveTrending']: (state, action) => {
        const { data } = action
        return state.merge({
            data
        })
    },
    ['updateTrendingLikeState']: (state, action) => {
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

export const getTrending = () => {
    return async dispatch => {
        const { code, data } = await api.get('frontend/trending')
        if (data && code === 200) {
            return dispatch({
                type: 'receiveTrending',
                data: data.list
            })
        }
        return dispatch(errConfig)
    }
}

export default createReducer(initStates, reducers)
