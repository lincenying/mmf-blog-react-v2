import React, {Component} from 'react'
import {connect} from 'react-redux'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'
import {propTypes} from '~decorators'
import topicsItemNone from '../../components/topics-item-none.jsx'
import topicsItem from '../../components/topics-item.jsx'
import trending from '../../components/aside-trending.jsx'
import category from '../../components/aside-category.jsx'

function mapDispatchToProps(dispatch) {
    return { dispatch }
}

@connect({}, mapDispatchToProps)
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
    handleLoadMore() {
    }
    render() {
        const {topics} = this.props
        let html
        if (!topics.path) {
            html =
                <div class="home-feeds cards-wrap">
                    <topicsItemNone>加载中, 请稍等...</topicsItemNone>
                </div>
        } else if (topics.data.length > 0) {
            const lists = topics.data.map(item => <topicsItem key={item._id} item={item} />)
            const hasNext = topics.hasNext ? <a onClick={this.handleLoadMore} href="javascript:;" class="load-more">更多<i class="icon icon-circle-loading" /></a> : ''
            html =
                <div class="home-feeds cards-wrap">
                    {lists}
                    <div class="load-more-wrap">
                        {hasNext}
                    </div>
                </div>
        } else {
            html =
                <div class="home-feeds cards-wrap">
                    <topicsItemNone>当前分类还没有文章...</topicsItemNone>
                </div>
        }
        return (
            <div class="main wrap clearfix">
                <div class="main-left">
                    {html}
                </div>
                <div class="main-right">
                    <category category={this.props.category} />
                    <trending trending={this.props.trending} />
                </div>
            </div>
        )
    }
}
