import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'

import {propTypes} from '~decorators'
import {getArticle} from '~reducers/article'

function mapStateToProps(state) {
    return {
        article: state.article.toJS()
    }
}
function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators({getArticle}, dispatch)
    return { ...actions, dispatch }
}

@connect(mapStateToProps, mapDispatchToProps)
@propTypes({
    article: PropTypes.object,
    getArticle: PropTypes.func.isRequired
})
@immutableRenderDecorator
export default class Article extends Component {
    componentWillMount() {
        const {pathname} = this.props.article
        if (pathname !== this.props.location.pathname) this.handlegetArticle()
    }
    componentDidUpdate(prevProps) {
        const pathname = this.props.location.pathname
        const prevPathname = prevProps.location.pathname
        if (pathname !== prevPathname) this.handlegetArticle()
    }
    handlegetArticle() {
        const {getArticle, params: {id}, location: {pathname}} = this.props
        getArticle({id, pathname})
    }
    render() {
        const {data} = this.props.article
        return (
            <div>
                <h3>{data.title}</h3>
                <div dangerouslySetInnerHTML={{__html: data.content}} />
            </div>
        )
    }
}
