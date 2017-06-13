import React, { Component } from 'react'
import Link from 'react-router-dom/Link'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import { getAdminList } from '~reducers/backend/admin'
import { setMessage, timeAgo } from '~utils'
import api from '~api'

function mapStateToProps(state) {
    return {
        admin: state.backendAdmin.toJS()
    }
}
function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators({ getAdminList }, dispatch)
    return { ...actions, dispatch }
}

@connect(mapStateToProps, mapDispatchToProps)
@immutableRenderDecorator
export default class AdminList extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.handleRecover = this.handleRecover.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.getAdminList = this.getAdminList.bind(this)
    }
    componentWillMount() {
        this.getAdminList(1)
    }
    async handleRecover(id) {
        const { data: { code, message } } = await api.get('backend/admin/recover', { id })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            this.props.dispatch({ type: 'recoverAdmin', id })
        }
    }
    async handleDelete(id) {
        const { data: { code, message } } = await api.get('backend/admin/delete', { id })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            this.props.dispatch({ type: 'deleteAdmin', id })
        }
    }
    handleLoadMore() {
        this.getAdminList()
    }
    getAdminList(page) {
        const { admin: { lists }, location: { pathname } } = this.props
        page = page || lists.page
        this.props.getAdminList({ page, pathname })
    }
    render() {
        const { admin } = this.props
        const lists = admin.lists.data.map((item, index) => {
            const btn = item.is_delete ? <a onClick={this.handleRecover.bind(this, item._id)} href="javascript:;">恢复</a> : <a onClick={this.handleDelete.bind(this, item._id)} href="javascript:;">删除</a>
            return (
                <div key={index} className="list-section">
                    <div className="list-username">{item.username}</div>
                    <div className="list-email">{item.email}</div>
                    <div className="list-date">{timeAgo(item.update_date)}</div>
                    <div className="list-action">
                        <Link to={`/backend/admin/modify/${item._id}`} className="badge badge-success">编辑</Link>
                        {btn}
                    </div>
                </div>
            )
        })
        const next = admin.lists.hasNext ? <div className="settings-footer clearfix"> <a onClick={this.handleLoadMore} className="admin-load-more" href="javascript:;">加载更多</a> </div> : ''
        return (
            <div className="settings-main card">
                <div className="settings-main-content">
                    <div className="list-section list-header">
                        <div className="list-username">用户名</div>
                        <div className="list-email">邮箱</div>
                        <div className="list-date">最后更新</div>
                        <div className="list-action">操作</div>
                    </div>
                    {lists}
                </div>
                {next}
            </div>
        )
    }
}
