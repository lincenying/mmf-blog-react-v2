import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import cookies from 'js-cookie'

import { propTypes } from '~decorators'
import api from '~api'
import { setMessage } from '~utils'
import { getCommentList } from '~reducers/global/comment'

function mapStateToProps(state) {
    return {
        comment: state.comment.toJS()
    }
}
function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators({ getCommentList }, dispatch)
    return { ...actions, dispatch }
}

@connect(mapStateToProps, mapDispatchToProps)
@immutableRenderDecorator
@propTypes({})
export default class FrontendComment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: ''
        }
        this.handleGetComment = this.handleGetComment.bind(this)
        this.handleReply = this.handleReply.bind(this)
        this.handlePostComment = this.handlePostComment.bind(this)
    }
    componentWillMount() {
        const { comment } = this.props
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
        const username = cookies.get('user')
        if (!username) {
            setMessage('请先登录!')
            this.props.dispatch({ type: 'showLoginModal', payload: true })
        } else if (this.state.content === '') {
            setMessage('请输入评论内容!')
        } else {
            const {
                data: { code, data }
            } = await api.post('frontend/comment/insert', {
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
    render() {
        const { comment } = this.props
        const html = comment.lists.data.map(item => {
            return (
                <div key={item._id} className="comment-item">
                    <a href="javascript:;" className="comment-author-avatar-link">
                        <img
                            src="//ww2.sinaimg.cn/large/005uQRNCgw1f4ij3d8m05j301s01smwx.jpg"
                            alt=""
                            className="avatar-img"
                        />
                    </a>
                    <div className="comment-content-wrap">
                        <span className="comment-author-wrap">
                            <a href="javascript:;" className="comment-author">
                                {item.username}
                            </a>
                        </span>
                        <div className="comment-content">{item.content}</div>
                        <div className="comment-footer">
                            <span className="comment-time">{item.creat_date}</span>
                            <a
                                onClick={this.handleReply.bind(this, item)}
                                href="javascript:;"
                                className="comment-action-item comment-reply"
                            >
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
                <a onClick={this.handleGetComment} href="javascript:;" className="comments-load-more">
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
                        <img
                            src="//ww2.sinaimg.cn/large/005uQRNCgw1f4ij3d8m05j301s01smwx.jpg"
                            alt=""
                            className="avatar-img"
                        />
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
                        <div className="comment-post-actions clearfix">
                            <a onClick={this.handlePostComment} href="javascript:;" className="btn btn-blue">
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
