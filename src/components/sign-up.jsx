import React, { Component } from 'react'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import { connect } from 'react-redux'
import api from '~/api'
import { setMessage, strlen } from '~/utils'

@connect(
    state => ({
        global: state.global.toJS()
    }),
    dispatch => ({ dispatch })
)
@immutableRenderDecorator
class signUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            re_password: ''
        }
        this.handleLogin = this.handleLogin.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }
    handleLogin() {
        this.props.dispatch({ type: 'showLoginModal', payload: true })
        this.props.dispatch({ type: 'showRegisterModal', payload: false })
    }
    async handleRegister() {
        if (!this.state.username || !this.state.password || !this.state.email) {
            setMessage('请将表单填写完整!')
            return
        } else if (strlen(this.state.username) < 4) {
            setMessage('用户长度至少 2 个中文或 4 个英文!')
            return
        } else if (strlen(this.state.password) < 8) {
            setMessage('密码长度至少 8 位!')
            return
        } else if (this.state.password !== this.state.re_password) {
            setMessage('密码和重复密码不一致!')
            return
        }
        const { code, message } = await api.post('frontend/user/insert', this.state)
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            this.handleLogin()
        }
    }
    handleClose() {
        this.props.dispatch({ type: 'showRegisterModal', payload: false })
    }
    render() {
        return (
            <div className={this.props.global.showRegisterModal ? 'modal-wrap modal-signup-wrap active' : 'modal-wrap modal-signup-wrap'}>
                <span className="center-helper" />
                <div className="modal modal-signup">
                    <h2 className="modal-title">注册</h2>
                    <a onClick={this.handleClose} href={null} className="modal-close">
                        <i className="icon icon-close-black" />
                    </a>
                    <div className="modal-content">
                        <div className="signup-form">
                            <form action="#">
                                <div className="input-wrap">
                                    <input
                                        value={this.state.username}
                                        onChange={e => this.setState({ username: e.target.value })}
                                        type="text"
                                        placeholder="昵称"
                                        className="base-input"
                                        autoComplete="off"
                                    />
                                    <p className="error-info input-info hidden">长度至少 6 位</p>
                                </div>
                                <div className="input-wrap">
                                    <input
                                        value={this.state.email}
                                        onChange={e => this.setState({ email: e.target.value })}
                                        type="text"
                                        placeholder="邮箱"
                                        className="base-input"
                                        autoComplete="off"
                                    />
                                    <p className="error-info input-info hidden">长度至少 6 位</p>
                                </div>
                                <div className="input-wrap">
                                    <input
                                        value={this.state.password}
                                        onChange={e => this.setState({ password: e.target.value })}
                                        type="password"
                                        placeholder="密码"
                                        className="base-input"
                                        autoComplete="off"
                                    />
                                    <p className="error-info input-info hidden">长度至少 6 位</p>
                                </div>
                                <div className="input-wrap">
                                    <input
                                        value={this.state.re_password}
                                        onChange={e => this.setState({ re_password: e.target.value })}
                                        type="password"
                                        placeholder="重复密码"
                                        className="base-input"
                                        autoComplete="off"
                                    />
                                    <p className="error-info input-info hidden">长度至少 6 位</p>
                                </div>
                                <a onClick={this.handleRegister} href={null} className="btn signup-btn btn-yellow">
                                    确认注册
                                </a>
                                <a onClick={this.handleLogin} href={null} className="btn signup-btn btn-blue block">
                                    直接登录
                                </a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default signUp
