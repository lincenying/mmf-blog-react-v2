import React, { Component } from 'react'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import { Prompt } from 'react-router-dom'

@immutableRenderDecorator
class PromptWrapper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            when: false
        }
    }
    componentDidMount() {
        setTimeout(() => {
            // eslint-disable-next-line react/no-did-mount-set-state
            this.setState({
                when: true
            })
        }, 1000)
    }
    render() {
        return <Prompt when={this.state.when} message={this.props.message} />
    }
}
export default PromptWrapper
