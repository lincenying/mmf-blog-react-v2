import React, { Component } from 'react'
import Link from 'react-router-dom/Link'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import { getCategoryItem } from '~reducers/global/category'
import { setMessage } from '~utils'
import api from '~api'
import AInput from '~components/_input.jsx'

function mapStateToProps(state) {
    return {
        category: state.category.toJS().item,
    }
}
function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators({ getCategoryItem }, dispatch)
    return { ...actions, dispatch }
}

@connect(mapStateToProps, mapDispatchToProps)
@immutableRenderDecorator
export default class CategoryModify extends Component {
    constructor(props) {
        super(props)
        const { cate_name, cate_order } = props.category
        this.state = {
            cate_name: cate_name || '',
            cate_order: cate_order || '',
        }
        this.handleModify = this.handleModify.bind(this)
    }
    componentWillMount() {
        this.props.getCategoryItem({ id: this.props.match.params.id })
    }
    componentDidUpdate(prevProps) {
        const { cate_name, cate_order } = this.props.category
        if (prevProps.category.cate_name !== cate_name) {
            this.setState({ cate_name, cate_order })
        }
    }
    async handleModify() {
        if (!this.state.cate_name || !this.state.cate_order) {
            setMessage('请将表单填写完整!')
            return
        }
        const item = {
            ...this.state,
            id: this.props.match.params.id,
        }
        const { data: { message, code, data } } = await api.post('backend/category/modify', item)
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            this.props.dispatch({ type: 'updateCategoryItem', data })
            this.props.history.push('/backend/category/list')
        }
    }
    render() {
        return (
            <div className="settings-main card">
                <div className="settings-main-content">
                    <AInput title="分类名称">
                        <input
                            value={this.state.cate_name}
                            onChange={e => this.setState({ cate_name: e.target.value })}
                            type="text"
                            placeholder="分类名称"
                            className="base-input"
                            name="cate_name"
                        />
                        <span className="input-info error">请输入分类名称</span>
                    </AInput>
                    <AInput title="分类排序">
                        <input
                            value={this.state.cate_order}
                            onChange={e => this.setState({ cate_order: e.target.value })}
                            type="text"
                            placeholder="分类排序"
                            className="base-input"
                            name="cate_order"
                        />
                        <span className="input-info error">请输入分类排序</span>
                    </AInput>
                </div>
                <div className="settings-footer clearfix">
                    <Link to="/backend/category/list" className="btn btn-blue">
                        返回
                    </Link>
                    <a onClick={this.handleModify} href="javascript:;" className="btn btn-yellow">
                        编辑分类
                    </a>
                </div>
            </div>
        )
    }
}
