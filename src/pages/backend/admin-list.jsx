import React, { Component } from 'react'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import api from '~/api'
import { getAdminList } from '~/store/reducers/backend/admin'
import { setMessage, timeAgo } from '~/utils'

@connect(
    state => ({
        admin: state.backendAdmin.toJS()
    }),
    dispatch => ({ ...bindActionCreators({ getAdminList }, dispatch), dispatch })
)
@immutableRenderDecorator
class AdminList extends Component {
    constructor(props) {
        super(props)
        this.state = { loading: false }
        this.handleRecover = this.handleRecover.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.getAdminList = this.getAdminList.bind(this)
        if (props.admin.lists.data.length === 0) this.getAdminList(1)
    }
    async handleRecover(id) {
        const { code, message } = await api.get('backend/admin/recover', {
            id
        })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            this.props.dispatch({ type: 'recoverAdmin', id })
        }
    }
    async handleDelete(id) {
        const { code, message } = await api.get('backend/admin/delete', {
            id
        })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            this.props.dispatch({ type: 'deleteAdmin', id })
        }
    }
    async handleLoadMore() {
        if (this.state.loading) return
        const { page } = this.props.admin.lists
        this.setState({ loading: true })
        await this.getAdminList(page + 1)
        this.setState({ loading: false })
    }
    async getAdminList(page) {
        const {
            admin: { lists },
            location: { pathname }
        } = this.props
        page = page || lists.page
        await this.props.getAdminList({ page, pathname })
    }
    render() {
        const { admin } = this.props
        const lists = admin.lists.data.map((item, index) => {
            const btn = item.is_delete ? (
                <a onClick={this.handleRecover.bind(this, item._id)} href={null}>
                    恢复
                </a>
            ) : (
                <a onClick={this.handleDelete.bind(this, item._id)} href={null}>
                    删除
                </a>
            )
            return (
                <div key={index} className="list-section">
                    <div className="list-username">{item.username}</div>
                    <div className="list-email">{item.userid.email}</div>
                    <div className="list-date">{timeAgo(item.update_date)}</div>
                    <div className="list-action">
                        <Link to={`/backend/admin/modify/${item._id}`} className="badge badge-success">
                            编辑
                        </Link>
                        {btn}
                    </div>
                </div>
            )
        })
        const next = admin.lists.hasNext ? (
            <div className="settings-footer">
                {' '}
                <a onClick={this.handleLoadMore} className="admin-load-more" href={null}>
                    {this.state.loading ? '加载中...' : '加载更多'}
                </a>{' '}
            </div>
        ) : (
            ''
        )
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
export default AdminList
