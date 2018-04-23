import React, { Component } from 'react'
import Link from 'react-router-dom/Link'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import { getCategoryList } from '~reducers/global/category'

function mapStateToProps(state) {
    return {
        category: state.category.toJS()
    }
}
function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators({ getCategoryList }, dispatch)
    return { ...actions, dispatch }
}

@connect(mapStateToProps, mapDispatchToProps)
@immutableRenderDecorator
export default class CategoryList extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        const {
            category: { lists },
            getCategoryList
        } = this.props
        if (lists.length === 0) getCategoryList()
    }
    render() {
        const {
            category: { lists }
        } = this.props
        const html = lists.map(item => {
            return (
                <div key={item._id} className="list-section">
                    <div className="list-title">{item.cate_name}</div>
                    <div className="list-time">{item.cate_order}</div>
                    <div className="list-action">
                        <Link to={'/backend/category/modify/' + item._id} className="badge badge-success">
                            编辑
                        </Link>
                    </div>
                </div>
            )
        })
        return (
            <div className="settings-main card">
                <div className="settings-main-content">
                    <div className="list-section">
                        <div className="list-title">分类名称</div>
                        <div className="list-time">分类排序</div>
                        <div className="list-action">操作</div>
                    </div>
                    {html}
                </div>
            </div>
        )
    }
}
