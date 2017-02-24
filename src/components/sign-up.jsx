import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'
import {propTypes} from '~decorators'
import {setMessage} from '~reducers/global'
import api from '~api'
import { strlen } from '~utils'

function mapStateToProps(state) {
    return {
        global: state.global.toJS()
    }
}
function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators({setMessage}, dispatch)
    return { ...actions, dispatch }
}

@connect(mapStateToProps, mapDispatchToProps)
@immutableRenderDecorator
@propTypes({

})
class signUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            re_password: '',
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
            setMessage({ type: 'error', content: '请将表单填写完整!' })
            return
        } else if (strlen(this.state.username) < 4) {
            setMessage({ type: 'error', content: '用户长度至少 2 个中文或 4 个英文!' })
            return
        } else if (strlen(this.state.password) < 8) {
            setMessage({ type: 'error', content: '密码长度至少 8 位!' })
            return
        } else if (this.state.password !== this.state.re_password) {
            setMessage({ type: 'error', content: '密码和重复密码不一致!' })
            return
        }
        const { data: { message, code} } = await api.post('frontend/user/insert', this.state)
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
            <div className={this.props.global.showRegisterModal ? 'modal-wrap modal-signup-wrap active' : 'modal-wrap modal-signup-wrap'}><span className="center-helper" />
                <div className="modal modal-signup">
                    <h2 className="modal-title">注册</h2><a onClick={this.handleClose} href="javascript:;" className="modal-close"><i className="icon icon-close-black" /></a>
                    <div className="modal-content">
                        <div className="signup-form">
                            <div className="input-wrap">
                                <input type="text" placeholder="昵称" className="base-input" />
                                <p className="error-info input-info hidden">长度至少 6 位</p>
                            </div>
                            <div className="input-wrap">
                                <input type="text" placeholder="邮箱" className="base-input" />
                                <p className="error-info input-info hidden">长度至少 6 位</p>
                            </div>
                            <div className="input-wrap">
                                <input type="password" placeholder="密码" className="base-input" />
                                <p className="error-info input-info hidden">长度至少 6 位</p>
                            </div>
                            <div className="input-wrap">
                                <input type="password" placeholder="重复密码" className="base-input" />
                                <p className="error-info input-info hidden">长度至少 6 位</p>
                            </div>
                            <a onClick={this.handleRegister} href="javascript:;" className="btn signup-btn btn-yellow">确认注册</a>
                            <a onClick={this.handleLogin} href="javascript:;" className="btn signup-btn btn-blue">直接登录</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default signUp
