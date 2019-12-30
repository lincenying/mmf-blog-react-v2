import React, { Component } from 'react'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import api from '~/api'
import AInput from '~/components/_input.jsx'
import { setMessage } from '~/utils'

@immutableRenderDecorator
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.handleLogin = this.handleLogin.bind(this)
    }
    async handleLogin() {
        if (!this.state.username || !this.state.password) {
            setMessage('请输入用户名和密码!')
            return
        }
        const { code, data } = await api.post('backend/admin/login', this.state)
        if (data && code === 200) {
            this.props.history.push('/backend/article/list')
        }
    }
    render() {
        return (
            <div className="main wrap">
                <div className="home-feeds cards-wrap">
                    <div className="settings-main card">
                        <div className="settings-main-content">
                            <AInput title="昵称">
                                <input
                                    value={this.state.username}
                                    onChange={e => this.setState({ username: e.target.value })}
                                    type="text"
                                    placeholder="昵称"
                                    className="base-input"
                                    name="username"
                                />
                                <span className="input-info error">请输入昵称</span>
                            </AInput>
                            <AInput title="密码">
                                <input
                                    value={this.state.password}
                                    onChange={e => this.setState({ password: e.target.value })}
                                    type="password"
                                    placeholder="密码"
                                    className="base-input"
                                    name="password"
                                />
                                <span className="input-info error">请输入密码</span>
                            </AInput>
                        </div>
                        <div className="settings-footer">
                            <a onClick={this.handleLogin} href={null} className="btn btn-yellow">
                                登录
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login
