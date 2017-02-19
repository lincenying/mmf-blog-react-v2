import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {ToastMessage, ToastContainer} from 'react-toastr'
import {setMessage} from '~reducers/global'
import {propTypes} from '~decorators'
var ToastMessageFactory = React.createFactory(ToastMessage.animation)

function mapStateToProps(state) {
    return {
        message: state.global.toJS().message
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({setMessage}, dispatch)
}

@connect(mapStateToProps, mapDispatchToProps)
@propTypes({
    message: PropTypes.object,
    setMessage: PropTypes.func.isRequired
})
export default class Toastr extends Component {
    componentDidUpdate(prevProps) {
        const { message, setMessage } = this.props
        const oldMessage = prevProps.message
        if (message.type !== '' && oldMessage.type === '') {
            const toastrRefs = this.container
            toastrRefs[message.type](message.title, message.content, {
                timeOut: 3000
            })
            setMessage({
                title: '',
                type: '',
                content: ''
            })
        }
    }
    render() {
        return (
            <ToastContainer ref={r => { this.container = r }} toastMessageFactory={ToastMessageFactory} className="toast-top-center" />
        )
    }
}
