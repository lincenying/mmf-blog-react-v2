import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'
import {propTypes} from '~decorators'
import Trending from '~components/aside-trending.jsx'
import {getTrending} from '~reducers/frontend/trending'

function mapStateToProps(state) {
    return {
        trending: state.trending.toJS()
    }
}
function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators({getTrending}, dispatch)
    return { ...actions, dispatch }
}

@connect(mapStateToProps, mapDispatchToProps)

@immutableRenderDecorator
@propTypes({

})
export default class About extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentWillMount() {
        const {trending: { data }, getTrending} = this.props
        if (data.length === 0) getTrending()
    }
    render() {
        return (
            <div className="main wrap clearfix">
                <div className="main-left">
                    <div className="card card-answer">
                        <div className="answer-content">
                            <div className="article-content">
                                <h3 className="about-title">关于作者</h3>
                                <div className="flex-item">
                                    <div className="flex-label">姓名:</div>
                                    <div className="flex-content">林岑影</div>
                                </div>
                                <div className="flex-item">
                                    <div className="flex-label">年龄:</div>
                                    <div className="flex-content">1987.09</div>
                                </div>
                                <div className="flex-item">
                                    <div className="flex-label">职业:</div>
                                    <div className="flex-content">前端开发</div>
                                </div>
                                <div className="flex-item">
                                    <div className="flex-label">Github:</div>
                                    <div className="flex-content"><a href="https://github.com/lincenying" target="_blank" rel='noopener noreferrer'>@lincenying</a></div>
                                </div>
                                <div className="flex-item">
                                    <div className="flex-label">技能:</div>
                                    <div className="flex-content">
                                        <ul className="about-ul">
                                            <li>HTML5 + CSS3</li>
                                            <li>NodeJS</li>
                                            <li>React</li>
                                            <li>Vue</li>
                                            <li>ES6</li>
                                            <li>Gulp</li>
                                            <li>WebPack</li>
                                            <li>jQuery</li>
                                            <li>PHP</li>
                                        </ul>
                                    </div>
                                </div>
                                <h3 className="about-title">关于网站</h3>
                                <p>本站服务端采用 express + mongoDB 搭建, 客户端采用 Vue2 的服务端渲染搭建</p>
                                <p>网站分成前台和后台, 前台采用 SSR 模式渲染, 后台采用 SPA 模式</p>
                                <p>主要功能包括: 管理员, 用户, 分类, 文章, 评论, 文章点赞</p>
                                <p>主要技术栈: express, mongoose, vue2, vue2-router, vuex, webpack, babel, eslint</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-right">
                    <Trending payload={this.props.trending.data} />
                </div>
            </div>
        )
    }
}
