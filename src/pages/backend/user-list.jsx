import React, { Component } from 'react'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import api from '~/api'
import { getUserList } from '~/store/reducers/backend/user'
import { setMessage, timeAgo } from '~/utils'

@connect(
    state => ({
        user: state.backendUser.toJS()
    }),
    dispatch => ({ ...bindActionCreators({ getUserList }, dispatch), dispatch })
)
@immutableRenderDecorator
class UserList extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.handleRecover = this.handleRecover.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.getUserList = this.getUserList.bind(this)

        this.getUserList(1)
    }
    async handleRecover(id) {
        const { code, message } = await api.get('backend/user/recover', {
            id
        })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            this.props.dispatch({ type: 'recoverUser', id })
        }
    }
    async handleDelete(id) {
        const { code, message } = await api.get('backend/user/delete', {
            id
        })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            this.props.dispatch({ type: 'deleteUser', id })
        }
    }
    handleLoadMore() {
        this.getUserList()
    }
    getUserList(page) {
        const {
            user: { lists },
            location: { pathname }
        } = this.props
        page = page || lists.page
        this.props.getUserList({ page, pathname })
    }
    render() {
        const { user } = this.props
        const lists = user.lists.data.map((item, index) => {
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
                    <div className="list-email">{item.email}</div>
                    <div className="list-date">{timeAgo(item.update_date)}</div>
                    <div className="list-action">
                        <Link to={`/backend/user/modify/${item._id}`} className="badge badge-success">
                            编辑
                        </Link>
                        {btn}
                    </div>
                </div>
            )
        })
        const next = user.lists.hasNext ? (
            <div className="settings-footer">
                {' '}
                <a onClick={this.handleLoadMore} className="admin-load-more" href={null}>
                    加载更多
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
export default UserList
