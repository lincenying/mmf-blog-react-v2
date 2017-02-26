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
    },
    ['insertCategoryItem']: (state, {item}) => {
        const { lists } = state.toJS()
        const data = [item].concat(lists.data)
        return state.mergeDeep({
            lists: {
                data
            }
        })
    },
    ['updateCategoryItem']: (state, {item}) => {
        const {lists} = state.toJS()
        const obj = lists.data.find(ii => ii._id === item.id)
        if (obj) {
            obj.cate_name = item.cate_name
            obj.cate_order = item.cate_order
        }
        return state.mergeDeep({
            lists,
            item
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
