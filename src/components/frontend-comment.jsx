import md5 from 'md5'
import React, { Component } from 'react'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import api from '~/api'
import { propTypes } from '~/decorators'
import { getCommentList } from '~/store/reducers/global/comment'
import { setMessage } from '~/utils'

@connect(
    state => ({
        global: state.global.toJS(),
        comment: state.comment.toJS()
    }),
    dispatch => ({ ...bindActionCreators({ getCommentList }, dispatch), dispatch })
)
@immutableRenderDecorator
@propTypes({})
class FrontendComment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: ''
        }
        this.handleGetComment = this.handleGetComment.bind(this)
        this.handleReply = this.handleReply.bind(this)
        this.handlePostComment = this.handlePostComment.bind(this)

        const { comment } = props
        if (comment.lists.pathname !== this.props.location.pathname) this.handleGetComment(1)
    }
    handleGetComment(page) {
        const {
            comment,
            getCommentList,
            location: { pathname },
            match: {
                params: { id }
            }
        } = this.props
        page = page || comment.lists.page
        getCommentList({ id, pathname, limit: 10, page })
    }
    async handlePostComment() {
        const username = this.props.global.cookies.user
        if (!username) {
            setMessage('请先登录!')
            this.props.dispatch({ type: 'showLoginModal', payload: true })
        } else if (this.state.content === '') {
            setMessage('请输入评论内容!')
        } else {
            const { code, data } = await api.post('frontend/comment/insert', {
                ...this.state,
                id: this.props.match.params.id
            })
            if (code === 200) {
                this.setState({ content: '' })
                setMessage({
                    content: '评论发布成功!',
                    type: 'success'
                })
                this.props.dispatch({ type: 'insertCommentItem', item: data })
            }
        }
    }
    handleReply(item) {
        this.setState({ content: '回复 @' + item.username + ': ' })
        document.querySelector('#content').focus()
    }
    avatar(email = 'lincenying@126.com') {
        return `https://fdn.geekzu.org/avatar/${md5(email)}?s=256&d=identicon&r=g`
    }
    render() {
        const { comment } = this.props
        const html = comment.lists.data.map(item => {
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
                            <span className="comment-time">{item.creat_date}</span>
                            <a onClick={this.handleReply.bind(this, item)} href={null} className="comment-action-item comment-reply">
                                回复
                            </a>
                        </div>
                    </div>
                </div>
            )
        })
        const hasNext = comment.lists.hasNext ? (
            <div className="load-more-wrap">
                {' '}
                <a onClick={this.handleGetComment} href={null} className="comments-load-more">
                    加载更多
                </a>{' '}
            </div>
        ) : (
            ''
        )
        return (
            <div className="card">
                <div className="comments">
                    <div className="comment-post-wrap">
                        {' '}
                        <img src={this.avatar(this.props.global.cookies.useremail)} alt="" className="avatar-img" />
                        <div className="comment-post-input-wrap base-textarea-wrap">
                            <textarea
                                value={this.state.content}
                                onChange={e => this.setState({ content: e.target.value })}
                                id="content"
                                className="textarea-input base-input"
                                cols="30"
                                rows="4"
                            />
                        </div>
                        <div className="comment-post-actions">
                            <a onClick={this.handlePostComment} href={null} className="btn btn-blue">
                                发表评论
                            </a>
                        </div>
                    </div>
                    <div className="comment-items-wrap">{html}</div>
                    {hasNext}
                </div>
            </div>
        )
    }
}
export default FrontendComment
