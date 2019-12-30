import React, { Component } from 'react'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import api from '~/api'
import Account from '~/components/aside-account.jsx'
import AInput from '~/components/_input.jsx'
import { setMessage } from '~/utils'

@immutableRenderDecorator
class UserPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            old_password: '',
            password: '',
            re_password: ''
        }
        this.handleModify = this.handleModify.bind(this)
    }
    async handleModify() {
        if (!this.state.password || !this.state.old_password || !this.state.re_password) {
            setMessage('请将表单填写完整!')
            return
        } else if (this.state.password !== this.state.re_password) {
            setMessage('两次密码输入不一致!')
            return
        }
        const { code, data } = await api.post('frontend/user/password', this.state)
        if (code === 200) {
            setMessage({ type: 'success', content: data })
            this.setState({
                old_password: '',
                password: '',
                re_password: ''
            })
        }
    }
    render() {
        return (
            <div className="main wrap">
                <div className="main-left">
                    <div className="home-feeds cards-wrap">
                        <div className="settings-main card">
                            <div className="settings-main-content">
                                <AInput title="当前密码">
                                    <input
                                        value={this.state.old_password}
                                        onChange={e => this.setState({ old_password: e.target.value })}
                                        type="password"
                                        placeholder="当前密码"
                                        className="base-input"
                                        name="old_password"
                                    />
                                </AInput>
                                <AInput title="新的密码">
                                    <input
                                        value={this.state.password}
                                        onChange={e => this.setState({ password: e.target.value })}
                                        type="password"
                                        placeholder="新的密码"
                                        className="base-input"
                                        name="password"
                                    />
                                </AInput>
                                <AInput title="确认密码">
                                    <input
                                        value={this.state.re_password}
                                        onChange={e => this.setState({ re_password: e.target.value })}
                                        type="password"
                                        placeholder="确认密码"
                                        className="base-input"
                                        name="re_password"
                                    />
                                </AInput>
                            </div>
                            <div className="settings-footer">
                                <a onClick={this.handleModify} href={null} className="btn btn-yellow">
                                    保存设置
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-right">
                    <Account />
                </div>
            </div>
        )
    }
}
export default UserPassword
