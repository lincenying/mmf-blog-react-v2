import api from '~api'
import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'
import { errConfig } from '../global'

const initStates = fromJS({
    data: {},
    pathname: ''
})

const reducers = {
    ['receiveArticle']: (state, action) => {
        const {data, pathname} = action
        return state.merge({
            data,
            pathname
        })
    }
}

export const getArticle = config => {
    return async dispatch => {
        const { data: { data, success }} = await api.get('https://cnodejs.org/api/v1/topic/' + config.id)
        if (success === true) {
            return dispatch({
                type: 'receiveArticle',
                data,
                ...config
            })
        }
        return dispatch(errConfig)
    }
}

export default createReducer(initStates, reducers)
