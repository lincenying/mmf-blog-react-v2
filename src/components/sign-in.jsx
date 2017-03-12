import React, {Component} from 'react'
import {connect} from 'react-redux'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'

import {propTypes} from '~decorators'
import {setMessage} from '~utils'
import api from '~api'

function mapStateToProps(state) {
    return {
        global: state.global.toJS()
    }
}

@connect(mapStateToProps, dispatch => ({ dispatch }))
@immutableRenderDecorator
@propTypes({

})
class signIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        }
        this.handleLogin = this.handleLogin.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }
    async handleLogin() {
        if (!this.state.username || !this.state.password) {
            setMessage('请将表单填写完整!')
            return
        }
        const { data: { message, code} } = await api.post('frontend/user/login', this.state)
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            //this._reactInternalInstance._context.router.go(0)
            //this.handleClose()
            setTimeout(() => {
                window.location.reload()
            }, 500)
        }
    }
    handleRegister() {
        this.props.dispatch({ type: 'showLoginModal', payload: false })
        this.props.dispatch({ type: 'showRegisterModal', payload: true })
    }
    handleClose() {
        this.props.dispatch({ type: 'showLoginModal', payload: false })
    }
    render() {
        return (
            <div className={this.props.global.showLoginModal ? 'modal-wrap modal-signin-wrap active' : 'modal-wrap modal-signin-wrap'}><span className="center-helper" />
                <div className="modal modal-signup">
                    <h2 className="modal-title">登录</h2><a onClick={this.handleClose} href="javascript:;" className="modal-close"><i className="icon icon-close-black" /></a>
                    <div className="modal-content">
                        <div className="signup-form">
                            <div className="input-wrap">
                                <input type="text" value={this.state.username} onChange={e => this.setState({username: e.target.value})} placeholder="昵称" className="base-input" />
                                <p className="error-info input-info hidden">长度至少 6 位</p>
                            </div>
                            <div className="input-wrap">
                                <input type="password" value={this.state.password} onChange={e => this.setState({password: e.target.value})} placeholder="密码" className="base-input" />
                                <p className="error-info input-info hidden">长度至少 6 位</p>
                            </div>
                            <a onClick={this.handleLogin} href="javascript:;" className="btn signup-btn btn-yellow">确认登录</a>
                            <a onClick={this.handleRegister} href="javascript:;" className="btn signup-btn btn-blue">我要注册</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default signIn
