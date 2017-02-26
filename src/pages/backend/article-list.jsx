import React, {Component} from 'react'
import Link from 'react-router/lib/Link'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'
import {getArticleList} from '~reducers/backend/article'
import {setMessage, timeAgo} from '~utils'
import api from '~api'

function mapStateToProps(state) {
    return {
        topics: state.backendArticle.toJS()
    }
}
function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators({getArticleList}, dispatch)
    return { ...actions, dispatch }
}

@connect(mapStateToProps, mapDispatchToProps)
@immutableRenderDecorator
export default class ArticleList extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.handleRecover = this.handleRecover.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.getArticleList = this.getArticleList.bind(this)
        this.handleLoadMore = this.handleLoadMore.bind(this)
    }
    componentWillMount() {
        this.getArticleList(1)
    }
    async handleRecover(id) {
        const { data: { code, message} } = await api.get('backend/article/recover', { id })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            this.props.dispatch({type: 'recoverArticle', id})
        }
    }
    async handleDelete(id) {
        const { data: { code, message} } = await api.get('backend/article/delete', { id })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            this.props.dispatch({type: 'deleteArticle', id})
        }
    }
    handleLoadMore() {
        this.getArticleList()
    }
    getArticleList(page) {
        const {topics: {lists}, location: {pathname}} = this.props
        page = page || lists.page
        this.props.getArticleList({page, pathname})
    }
    render() {
        const {topics} = this.props
        const lists = topics.lists.data.map((item, index) => {
            const btn = item.is_delete ? <a onClick={this.handleRecover.bind(this, item._id)} href="javascript:;">恢复</a> : <a onClick={this.handleDelete.bind(this, item._id)} href="javascript:;">删除</a>
            const com = item.comment_count > 0 ? <Link to={'/backend/article/comment/' + item._id} className="badge badge-success">评论</Link> : ''
            return (
                <div key={index} className="list-section">
                    <div className="list-title">{ item.title }</div>
                    <div className="list-category">{ item.category_name }</div>
                    <div className="list-date">{ timeAgo(item.timestamp) }</div>
                    <div className="list-action">
                        <Link to={'/backend/article/modify/' + item._id} className="badge badge-success">编辑</Link>
                        {btn}
                        {com}
                    </div>
                </div>
            )
        })
        const next = topics.lists.hasNext ? <div className="settings-footer clearfix"> <a onClick={this.handleLoadMore} className="admin-load-more" href="javascript:;">加载更多</a> </div> : ''
        return (
            <div className="settings-main card">
                <div className="settings-main-content">
                    <div className="list-section list-header">
                        <div className="list-title">标题</div>
                        <div className="list-category">分类</div>
                        <div className="list-date">时间</div>
                        <div className="list-action">操作</div>
                    </div>
                    {lists}
                </div>
                {next}
            </div>
        )
    }
}
