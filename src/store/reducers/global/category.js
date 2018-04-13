import api from '~api'
import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'
import { errConfig } from '../global'

const initStates = fromJS({
    lists: [],
    item: {},
})

const reducers = {
    ['receiveCategoryList']: (state, action) => {
        const { data } = action
        return state.mergeDeep({
            lists: data,
        })
    },
    ['receiveCategoryItem']: (state, action) => {
        const { data } = action
        return state.mergeDeep({
            item: data,
        })
    },
    ['insertCategoryItem']: (state, { item }) => {
        const { lists } = state.toJS()
        const data = [item].concat(lists.data)
        return state.mergeDeep({
            lists: {
                data,
            },
        })
    },
    ['updateCategoryItem']: (state, { data }) => {
        const { lists } = state.toJS()
        const index = lists.findIndex(ii => ii._id === data._id)
        if (index > -1) {
            state.lists.splice(index, 1, data)
        }
        return state.mergeDeep({
            lists,
            item: data,
        })
    },
}

export const getCategoryList = config => {
    return async dispatch => {
        const {
            data: { data, code },
        } = await api.get('backend/category/list', config)
        if (code === 200) {
            return dispatch({
                type: 'receiveCategoryList',
                data: data.list,
            })
        }
        return dispatch(errConfig)
    }
}
export const getCategoryItem = config => {
    return async dispatch => {
        const {
            data: { data, code },
        } = await api.get('backend/category/item', config)
        if (code === 200) {
            return dispatch({
                type: 'receiveCategoryItem',
                data,
            })
        }
        return dispatch(errConfig)
    }
}

export default createReducer(initStates, reducers)
