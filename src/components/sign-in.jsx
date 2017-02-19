import React, {Component} from 'react'
import {connect} from 'react-redux'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'
import {propTypes} from '~decorators'

function mapDispatchToProps(dispatch) {
    return { dispatch }
}

@connect({}, mapDispatchToProps)
@immutableRenderDecorator
@propTypes({

})
export default class Main extends Component {
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
            <div class="modal-wrap modal-signin-wrap" className={this.props.show ? 'active' : ''}><span class="center-helper" />
                <div class="modal modal-signup">
                    <h2 class="modal-title">登录</h2><a onClick={this.handleClose} href="javascript:;" class="modal-close"><i class="icon icon-close-black" /></a>
                    <div class="modal-content">
                        <div class="signup-form">
                            <div class="input-wrap">
                                <input type="text" placeholder="昵称" class="base-input" />
                                <p class="error-info input-info hidden">长度至少 6 位</p>
                            </div>
                            <div class="input-wrap">
                                <input type="password" placeholder="密码" class="base-input" />
                                <p class="error-info input-info hidden">长度至少 6 位</p>
                            </div>
                            <a onClick={this.handleLogin} href="javascript:;" class="btn signup-btn btn-yellow">确认登录</a>
                            <a onClick={this.handleRegister} href="javascript:;" class="btn signup-btn btn-blue">我要注册</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
