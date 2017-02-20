import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'
import ls from 'store2'

import {propTypes} from '~decorators'
import TopicsItemNone from '../../components/topics-item-none.jsx'
import TopicsItem from '../../components/topics-item.jsx'
import Trending from '../../components/aside-trending.jsx'
import Category from '../../components/aside-category.jsx'
import {getTopics} from '~reducers/frontend/topics'

function mapStateToProps(state) {
    return {
        topics: state.topics.toJS()
    }
}
function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators({getTopics}, dispatch)
    return { ...actions, dispatch }
}

@connect(mapStateToProps, mapDispatchToProps)

@immutableRenderDecorator
@propTypes({
})
export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.handleLoadMore = this.handleLoadMore.bind(this)
    }
    componentWillMount() {
        const {pathname} = this.props.topics
        if (pathname !== this.props.location.pathname) this.handlefetchPosts()
    }
    componentDidMount() {
        const path = this.props.location.pathname
        const scrollTop = ls.get(path) || 0
        window.scrollTo(0, scrollTop)
    }
    componentDidUpdate(prevProps) {
        const pathname = this.props.location.pathname
        const prevPathname = prevProps.location.pathname
        if (pathname !== prevPathname) this.handlefetchPosts()
    }
    handlefetchPosts(page = 1) {
        const {getTopics, location: {pathname}} = this.props
        getTopics({page, pathname})
    }
    handleLoadMore() {
        const {page} = this.props.topics
        this.handlefetchPosts(page + 1)
    }
    render() {
        const {topics} = this.props
        let html
        if (!topics.pathname) {
            html =
                <div className="home-feeds cards-wrap">
                    <TopicsItemNone>加载中, 请稍等...</TopicsItemNone>
                </div>
        } else if (topics.data.length > 0) {
            const lists = topics.data.map(item => <TopicsItem key={item._id} payload={item} />)
            const hasNext = topics.hasNext ? <a onClick={this.handleLoadMore} href="javascript:;" className="load-more">更多<i className="icon icon-circle-loading" /></a> : ''
            html =
                <div className="home-feeds cards-wrap">
                    {lists}
                    <div className="load-more-wrap">
                        {hasNext}
                    </div>
                </div>
        } else {
            html =
                <div className="home-feeds cards-wrap">
                    <TopicsItemNone>当前分类还没有文章...</TopicsItemNone>
                </div>
        }
        return (
            <div className="main wrap clearfix">
                <div className="main-left">
                    {html}
                </div>
                <div className="main-right">
                    <Category payload={[]} />
                    <Trending payload={[]} />
                </div>
            </div>
        )
    }
}
