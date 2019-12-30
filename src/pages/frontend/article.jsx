import React, { Component } from 'react'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Category from '~/components/aside-category.jsx'
import Other from '~/components/aside-other.jsx'
import Trending from '~/components/aside-trending.jsx'
import Comment from '~/components/frontend-comment.jsx'
import Actions from '~/components/item-actions.jsx'
import { propTypes } from '~/decorators'
import { getArticleItem } from '~/store/reducers/frontend/article'
import { getTrending } from '~/store/reducers/frontend/trending'
import { getCategoryList } from '~/store/reducers/global/category'

const addTarget = content => {
    if (!content) return ''
    return content.replace(/<a(.*?)href=/g, '<a$1target="_blank" href=')
}

@connect(
    state => ({
        article: state.article.toJS(),
        category: state.category.toJS(),
        trending: state.trending.toJS()
    }),
    { getArticleItem, getTrending, getCategoryList }
)
@immutableRenderDecorator
@propTypes({})
class Article extends Component {
    constructor(props) {
        super(props)
        const { article, category, trending, getTrending, getCategoryList } = props
        if (article.pathname !== this.props.location.pathname) this.handlefetchArticle()
        if (category.lists.length === 0) getCategoryList()
        if (trending.data.length === 0) getTrending()
        console.log(`article: constructor`)
    }
    componentDidMount() {
        console.log(`article: componentDidMount`)
        window.scrollTo(0, 0)
    }
    componentDidUpdate(prevProps) {
        const pathname = this.props.location.pathname
        const prevPathname = prevProps.location.pathname
        if (pathname !== prevPathname) {
            console.log(`article: componentDidUpdate`)
            this.handlefetchArticle()
        }
    }
    async handlefetchArticle() {
        const {
            getArticleItem,
            match: {
                params: { id }
            },
            location: { pathname }
        } = this.props
        await getArticleItem({ id, pathname })
    }
    render() {
        const {
            article,
            category,
            trending,
            location: { pathname }
        } = this.props
        let html
        if (!article.isLoad || pathname !== article.pathname) {
            html = (
                <div className="main-left">
                    <div className="card card-answer">
                        <div className="answer-content">加载中, 请稍等...</div>
                    </div>
                </div>
            )
        } else if (article.data._id) {
            html = (
                <div className="main-left">
                    <div className="card card-question-head">
                        <div className="question-content">
                            <Link to={'/category/' + article.data.category} className="topic-link-item">
                                {article.data.category_name}
                            </Link>
                            <h2 className="question-title">
                                <Link to={'/article/' + article.data._id} className="question-title-link">
                                    {article.data.title}
                                </Link>
                            </h2>
                        </div>
                    </div>
                    <div className="card card-answer">
                        <div className="answer-content">
                            <div
                                className="article-content markdown-body"
                                dangerouslySetInnerHTML={{
                                    __html: addTarget(article.data.html)
                                }}
                            />
                        </div>
                        <Actions item={article.data} />
                    </div>
                    <Comment {...this.props} />
                </div>
            )
        } else {
            html = (
                <div className="main-left">
                    <div className="card card-answer">
                        <div className="answer-content">该文章不存在, 或者该文章已经被删除</div>
                    </div>
                </div>
            )
        }
        return (
            <div className="main wrap">
                {html}
                <div className="main-right">
                    <Category payload={category.lists} />
                    <Trending payload={trending.data} />
                    <Other />
                </div>
            </div>
        )
    }
}
export default Article
