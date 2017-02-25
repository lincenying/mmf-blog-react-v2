import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'
import {propTypes} from '~decorators'

function mapStateToProps(state) {
    return {
        trending: state.trending.toJS()
    }
}
function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators({}, dispatch)
    return { ...actions, dispatch }
}

@connect(mapStateToProps, mapDispatchToProps)

@immutableRenderDecorator
@propTypes({

})
export default class Login extends Component {
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
            <div className="settings-main card" />
        )
    }
}
