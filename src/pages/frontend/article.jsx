import React, {Component} from 'react'
import {connect} from 'react-redux'
import Link from 'react-router/lib/Link'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'
import {propTypes} from '~decorators'
import comment from '../../components/frontend-comment.jsx'
import trending from '../../components/aside-trending.jsx'
import category from '../../components/aside-category.jsx'
import actions from '../../components/item-actions.jsx'

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
    }
    render() {
        const {article, comments} = this.props
        let html
        if (!article.isLoad) {
            html =
                <div class="main-left">
                    <div class="card card-answer">
                        <div class="answer-content">加载中, 请稍等...</div>
                    </div>
                </div>
        } else if (article.data._id) {
            html =
                <div class="main-left">
                    <div class="card card-question-head">
                        <div class="question-content">
                            <Link to={'/category/' + article.data.category} class="topic-link-item">{article.data.category_name}</Link>
                            <h2 class="question-title"><Link to={'/article/' + article.data._id} class="question-title-link">{article.data.title}</Link></h2>
                        </div>
                    </div>
                    <div class="card card-answer">
                        <div class="answer-content">
                            <div class="article-content markdown-body" v-html="addTarget(article.data.html)" />
                        </div>
                        <actions item={article.data} />
                    </div>
                    <comment comments={comments} />
                </div>
        } else {
            html =
                <div class="main-left">
                    <div class="card card-answer">
                        <div class="answer-content">该文章不存在, 或者该文章已经被删除</div>
                    </div>
                </div>
        }
        return (
            <div class="main wrap clearfix">
                {html}
                <div class="main-right">
                    <category category={this.props.category} />
                    <trending trending={this.props.trending} />
                </div>
            </div>
        )
    }
}
