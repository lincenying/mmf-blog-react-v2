import React, { Component } from 'react'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { getCategoryList } from '~/store/reducers/global/category'

@connect(
    state => ({
        category: state.category.toJS()
    }),
    dispatch => ({ ...bindActionCreators({ getCategoryList }, dispatch), dispatch })
)
@immutableRenderDecorator
class CategoryList extends Component {
    constructor(props) {
        super(props)

        const {
            category: { lists },
            getCategoryList
        } = props
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
export default CategoryList
