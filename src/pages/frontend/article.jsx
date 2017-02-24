import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Link from 'react-router/lib/Link'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'

import {propTypes} from '~decorators'
import Comment from '../../components/frontend-comment.jsx'
import Trending from '../../components/aside-trending.jsx'
import Category from '../../components/aside-category.jsx'
import Actions from '../../components/item-actions.jsx'
import {getArticleItem} from '~reducers/frontend/article'
import {getTrending} from '~reducers/frontend/trending'
import {getCategoryList} from '~reducers/global/category'

function mapStateToProps(state) {
    return {
        article: state.article.toJS(),
        category: state.category.toJS(),
        trending: state.trending.toJS(),
    }
}
function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators({getArticleItem, getTrending, getCategoryList}, dispatch)
    return { ...actions, dispatch }
}

const addTarget = content => {
    if (!content) return ''
    return content.replace(/<a(.*?)href=/g, '<a$1target="_blank" href=')
}

@connect(mapStateToProps, mapDispatchToProps)

@immutableRenderDecorator
@propTypes({

})
export default class Article extends Component {
    componentWillMount() {
        const { article, category, trending, getTrending, getCategoryList} = this.props
        if (article.pathname !== this.props.location.pathname) this.handlefetchArticle()
        if (category.lists.length === 0) getCategoryList()
        if (trending.data.length === 0) getTrending()
    }
    componentDidUpdate(prevProps) {
        const pathname = this.props.location.pathname
        const prevPathname = prevProps.location.pathname
        if (pathname !== prevPathname) this.handlefetchArticle()
    }
    handlefetchArticle() {
        const {getArticleItem, params: {id}, location: {pathname}} = this.props
        getArticleItem({ id, pathname })
    }
    render() {
        const {article, comments, category, trending} = this.props
        let html
        if (!article.isLoad) {
            html =
                <div className="main-left">
                    <div className="card card-answer">
                        <div className="answer-content">加载中, 请稍等...</div>
                    </div>
                </div>
        } else if (article.data._id) {
            html =
                <div className="main-left">
                    <div className="card card-question-head">
                        <div className="question-content">
                            <Link to={'/category/' + article.data.category} className="topic-link-item">{article.data.category_name}</Link>
                            <h2 className="question-title"><Link to={'/article/' + article.data._id} className="question-title-link">{article.data.title}</Link></h2>
                        </div>
                    </div>
                    <div className="card card-answer">
                        <div className="answer-content">
                            <div className="article-content markdown-body" dangerouslySetInnerHTML={{__html: addTarget(article.data.html)}} />
                        </div>
                        <Actions item={article.data} payload="item" />
                    </div>
                    <Comment comments={comments} />
                </div>
        } else {
            html =
                <div className="main-left">
                    <div className="card card-answer">
                        <div className="answer-content">该文章不存在, 或者该文章已经被删除</div>
                    </div>
                </div>
        }
        return (
            <div className="main wrap clearfix">
                {html}
                <div className="main-right">
                    <Category payload={category.lists} />
                    <Trending payload={trending.data} />
                </div>
            </div>
        )
    }
}
