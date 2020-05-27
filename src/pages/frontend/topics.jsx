import React, { Component } from 'react'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import { connect } from 'react-redux'
import ls from 'store2'
import Category from '~/components/aside-category.jsx'
import Other from '~/components/aside-other.jsx'
import Trending from '~/components/aside-trending.jsx'
import PromptWrapper from '~/components/prompt-wrapper.jsx'
import TopicsItemNone from '~/components/topics-item-none.jsx'
import TopicsItem from '~/components/topics-item.jsx'
import { propTypes } from '~/decorators'
import { getTopics } from '~/store/reducers/frontend/topics'
import { getTrending } from '~/store/reducers/frontend/trending'
import { getCategoryList } from '~/store/reducers/global/category'

@connect(
    state => ({
        topics: state.topics.toJS(),
        category: state.category.toJS(),
        trending: state.trending.toJS()
    }),
    { getTopics, getTrending, getCategoryList }
)
@immutableRenderDecorator
@propTypes({})
class Topics extends Component {
    constructor(props) {
        super(props)
        this.state = {
            scrollTop: 0
        }
        this.handleLoadMore = this.handleLoadMore.bind(this)

        const { category, trending, topics, getTrending, getCategoryList } = props
        if (topics.pathname !== this.props.location.pathname) this.handlefetchPosts()
        if (category.lists.length === 0) getCategoryList()
        if (trending.data.length === 0) getTrending()
        console.log(`topics: constructor`)
    }
    componentDidMount() {
        console.log(`topics: componentDidMount`)
        const pathname = this.props.location.pathname
        if (this.props.topics.pathname !== '') {
            const scrollTop = ls.get(pathname) || 0
            // ls.remove(pathname)
            if (scrollTop) window.scrollTo(0, scrollTop)
        }
    }
    componentDidUpdate(prevProps) {
        const pathname = this.props.location.pathname
        const prevPathname = prevProps.location.pathname
        if (pathname !== prevPathname) {
            console.log(`topics: componentDidUpdate`)
            this.handlefetchPosts()
        }
        if (this.props.topics.pathname !== '' && this.props.topics.pathname !== prevProps.topics.pathname) {
            const scrollTop = ls.get(this.props.topics.pathname) || 0
            // ls.remove(pathname)
            window.scrollTo(0, scrollTop)
        }
    }
    componentWillUnmount() {
        console.log(`topics: componentWillUnmount`)
    }
    handlefetchPosts(page = 1) {
        const {
            getTopics,
            location: { pathname },
            match: {
                params: { id, key, by }
            }
        } = this.props
        getTopics({ id, key, by, pathname, page })
    }
    handleLoadMore() {
        const { page } = this.props.topics
        this.handlefetchPosts(page + 1)
    }
    render() {
        const { topics, category, trending } = this.props
        let html
        if (!topics.pathname) {
            html = (
                <div className="home-feeds cards-wrap">
                    <TopicsItemNone>加载中, 请稍等...</TopicsItemNone>
                </div>
            )
        } else if (topics.data.length > 0) {
            const lists = topics.data.map(item => <TopicsItem key={item._id} payload={item} />)
            const hasNext = topics.hasNext ? (
                <a onClick={this.handleLoadMore} href={null} className="load-more">
                    更多
                    <i className="icon icon-circle-loading" />
                </a>
            ) : (
                ''
            )
            html = (
                <div className="home-feeds cards-wrap">
                    {lists}
                    <div className="load-more-wrap">{hasNext}</div>
                </div>
            )
        } else {
            html = (
                <div className="home-feeds cards-wrap">
                    <TopicsItemNone>当前分类还没有文章...</TopicsItemNone>
                </div>
            )
        }
        return (
            <div className="main wrap">
                <PromptWrapper
                    message={() => {
                        const path = this.props.location.pathname
                        const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
                        ls.set(path, scrollTop)
                        return true
                    }}
                />
                <div className="main-left">{html}</div>
                <div className="main-right">
                    <Category payload={category.lists} />
                    <Trending payload={trending.data} />
                    <Other />
                </div>
            </div>
        )
    }
}
export default Topics
