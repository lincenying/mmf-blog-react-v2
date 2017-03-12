import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'

import {getCommentList} from '~reducers/global/comment'
import {setMessage, timeAgo} from '~utils'
import api from '~api'

function mapStateToProps(state) {
    return {
        comment: state.comment.toJS()
    }
}
function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators({getCommentList}, dispatch)
    return { ...actions, dispatch }
}

@connect(mapStateToProps, mapDispatchToProps)
@immutableRenderDecorator
export default class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentWillMount() {
        const {comment: { pathname }} = this.props
        if (pathname !== this.props.location.pathname) this.getCommentList(1)
    }
    async handleRecover(id) {
        const { data: { code, message} } = await api.get('backend/comment/recover', { id })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            this.props.dispatch({type: 'recoverComment', id})
        }
    }
    async handleDelete(id) {
        const { data: { code, message} } = await api.get('backend/comment/delete', { id })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            this.props.dispatch({type: 'deleteComment', id})
        }
    }
    handleLoadMore() {
        this.getCommentList()
    }
    getCommentList(page) {
        const {comment: {lists}, location: {pathname}, match: {params: {id}}} = this.props
        page = page || lists.page
        this.props.getCommentList({id, page, pathname})
    }
    render() {
        const {comment} = this.props
        const html = comment.lists.data.map(item => {
            const btn = item.is_delete ? <a onClick={this.handleRecover.bind(this, item._id)} href="javascript:;">恢复</a> : <a onClick={this.handleDelete.bind(this, item._id)} href="javascript:;">删除</a>
            return (
                <div key={item._id} className="comment-item">
                    <a href="javascript:;" className="comment-author-avatar-link">
                        <img src="//ww2.sinaimg.cn/large/005uQRNCgw1f4ij3d8m05j301s01smwx.jpg" alt="" className="avatar-img" />
                    </a>
                    <div className="comment-content-wrap">
                        <span className="comment-author-wrap">
                            <a href="javascript:;" className="comment-author">{ item.username }</a>
                        </span>
                        <div className="comment-content">{ item.content }</div>
                        <div className="comment-footer">
                            <span className="comment-time">{ timeAgo(item.timestamp) }</span>
                            {btn}
                        </div>
                    </div>
                </div>
            )
        })
        const next = comment.lists.hasNext ? <div className="settings-footer clearfix"> <a onClick={this.handleLoadMore} className="admin-load-more" href="javascript:;">加载更多</a> </div> : ''
        return (
            <div className="card">
                <div className="comments">
                    <div className="comment-items-wrap">
                        {html}
                    </div>
                    {next}
                </div>
            </div>
        )
    }
}
