import md5 from 'md5'
import React, { Component } from 'react'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import api from '~/api'
import { getCommentList } from '~/store/reducers/global/comment'
import { setMessage, timeAgo } from '~/utils'

@connect(
    state => ({
        comment: state.comment.toJS()
    }),
    dispatch => ({ ...bindActionCreators({ getCommentList }, dispatch), dispatch })
)
@immutableRenderDecorator
class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {}

        const {
            comment: { pathname }
        } = props
        if (pathname !== this.props.location.pathname) this.getCommentList(1)
    }
    async handleRecover(id) {
        const { code, message } = await api.get('frontend/comment/recover', { id })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            this.props.dispatch({ type: 'recoverComment', id })
        }
    }
    async handleDelete(id) {
        const { code, message } = await api.get('frontend/comment/delete', { id })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            this.props.dispatch({ type: 'deleteComment', id })
        }
    }
    handleLoadMore() {
        this.getCommentList()
    }
    getCommentList(page) {
        const {
            comment: { lists },
            location: { pathname },
            match: {
                params: { id }
            }
        } = this.props
        page = page || lists.page
        this.props.getCommentList({ id, page, pathname })
    }
    avatar(email = 'lincenying@126.com') {
        return `https://fdn.geekzu.org/avatar/${md5(email)}?s=256&d=identicon&r=g`
    }
    render() {
        const { comment } = this.props
        const html = comment.lists.data.map(item => {
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
                <div key={item._id} className="comment-item">
                    <a href={null} className="comment-author-avatar-link">
                        <img src={this.avatar(item.userid.email)} alt="" className="avatar-img" />
                    </a>
                    <div className="comment-content-wrap">
                        <span className="comment-author-wrap">
                            <a href={null} className="comment-author">
                                {item.username}
                            </a>
                        </span>
                        <div className="comment-content">{item.content}</div>
                        <div className="comment-footer">
                            <span className="comment-time">{timeAgo(item.timestamp)}</span>
                            {btn}
                        </div>
                    </div>
                </div>
            )
        })
        const next = comment.lists.hasNext ? (
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
            <div className="card">
                <div className="comments">
                    <div className="comment-items-wrap">{html}</div>
                    {next}
                </div>
            </div>
        )
    }
}
export default Comment
