import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'
import ls from 'store2'
import {propTypes} from '~decorators'
import {getTopics} from '~reducers/topics'
import MainItem from "./item.jsx"

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
    getTopics: PropTypes.func.isRequired,
    topics: PropTypes.object
})
export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            msg: 'Hello World!'
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
        const {data} = this.props.topics
        const lists = data.map(list => {
            return (
                <MainItem key={list.id} list={list} />
            )
        })
        return (
            <div>
                <div>{this.state.msg}</div>
                <ul>
                    {lists}
                </ul>
                <div>
                    <a onClick={this.handleLoadMore} href="javascript:;">加载更多</a>
                </div>
            </div>
        )
    }
}
