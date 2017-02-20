import React, {Component} from 'react'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'
import {propTypes} from '~decorators'

@immutableRenderDecorator
@propTypes({

})
class signUp extends Component {
    constructor(props) {
        super(props)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }
    handleLogin() {
    }
    handleRegister() {
    }
    handleClose() {

    }
    render() {
        return (
            <div className={this.props.show ? 'modal-wrap modal-signup-wrap active' : 'modal-wrap modal-signup-wrap'}><span className="center-helper" />
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
