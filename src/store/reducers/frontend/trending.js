import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'
import api from '~api'
import { errConfig } from '../global'

const initStates = fromJS({
    data: []
})

const reducers = {
    ['receiveTrending']: (state, action) => {
        const {data} = action
        return state.merge({
            data
        })
    }
}

export const getTrending = () => {
    return async dispatch => {
        const { data: { data, code} } = await api.get('frontend/trending')
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
