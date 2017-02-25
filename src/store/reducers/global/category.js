import api from '~api'
import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'
import { errConfig } from '../global'

const initStates = fromJS({
    lists: [],
    item: {}
})

const reducers = {
    ['receiveCategoryList']: (state, action) => {
        const {data} = action
        return state.mergeDeep({
            lists: data
        })
    },
    ['receiveCategoryItem']: (state, action) => {
        const {data} = action
        return state.mergeDeep({
            item: data
        })
    }
}

export const getCategoryList = config => {
    return async dispatch => {
        const { data: { data, code} } = await api.get('backend/category/list', config)
        if (code === 200) {
            return dispatch({
                type: 'receiveCategoryList',
                data: data.list
            })
        }
        return dispatch(errConfig)
    }
}
export const getCategoryItem = config => {
    return async dispatch => {
        const { data: { data, code} } = await api.get('backend/category/item', config)
        if (code === 200) {
            return dispatch({
                type: 'receiveCategoryItem',
                data
            })
        }
        return dispatch(errConfig)
    }
}

export default createReducer(initStates, reducers)
