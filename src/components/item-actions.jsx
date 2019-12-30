import React, { Component } from 'react'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import { connect } from 'react-redux'
import api from '~/api'
import { setMessage } from '~/utils'

@connect(
    state => ({
        global: state.global.toJS()
    }),
    dispatch => ({ dispatch })
)
@immutableRenderDecorator
class ItemActions extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.handleLike = this.handleLike.bind(this)
        this.handleShare = this.handleShare.bind(this)
    }
    async handleLike() {
        const username = this.props.global.cookies.user
        const { dispatch, item } = this.props
        if (!username) {
            setMessage('请先登录!')
            dispatch({ type: 'showLoginModal', payload: true })
            return
        }
        let url = 'frontend/like'
        if (item.like_status) url = 'frontend/unlike'
        const { code, message } = await api.get(url, { id: item._id })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            dispatch({ type: 'updateTopicsLikeState', payload: item._id })
            dispatch({ type: 'updateArticleLikeState', payload: item._id })
            //dispatch({type: 'updateTrendingLikeState', payload: item._id})
        }
    }
    handleShare() {
        const top = window.screen.height / 2 - 250
        const left = window.screen.width / 2 - 300
        const title = this.props.item.title + ' - M.M.F 小屋'
        const url = 'https://www.mmxiaowu.com/article/' + this.props.item._id
        window.open(
            'http://service.weibo.com/share/share.php?title=' +
                encodeURIComponent(title.replace(/&nbsp;/g, ' ').replace(/<br \/>/g, ' ')) +
                '&url=' +
                encodeURIComponent(url),
            '分享至新浪微博',
            'height=500, width=600, top=' + top + ', left=' + left + ', toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no'
        )
    }
    render() {
        const item = this.props.item
        return (
            <div className="actions-wrap">
                <a onClick={this.handleLike} href={null} className={item.like_status ? 'action-item active' : 'action-item'}>
                    <i className={item.like_status ? 'icon icon-action-voteup-active' : 'icon icon-action-voteup'} />
                    <span className="text">{item.like} 赞</span>
                </a>
                <a href={null} className="action-item">
                    <i className="icon icon-action-comment" />
                    <span className="text">{item.comment_count} 评论</span>
                </a>
                <a href={null} className="action-item action-item-fav">
                    <i className="icon icon-action-fav" />
                    <span className="text">{item.visit} 浏览</span>
                </a>
                <a onClick={this.handleShare} href={null} className="action-item">
                    <i className="icon icon-action-share" />
                    <span className="text">分享</span>
                </a>
            </div>
        )
    }
}
export default ItemActions
