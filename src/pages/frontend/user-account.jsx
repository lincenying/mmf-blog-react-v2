import React, { Component } from 'react'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import { connect } from 'react-redux'
import api from '~/api'
import Account from '~/components/aside-account.jsx'
import AInput from '~/components/_input.jsx'
import { propTypes } from '~/decorators'
import { setCookis } from '~/store/reducers/global'
import { setMessage } from '~/utils'

@connect(null, { setCookis })
@immutableRenderDecorator
@propTypes({})
class UserAccount extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: ''
        }
        this.getUser = this.getUser.bind(this)
        this.handleModify = this.handleModify.bind(this)

        this.getUser()
    }
    async getUser() {
        const { code, data } = await api.get('frontend/user/account')
        if (code === 200) {
            this.setState({
                username: data.username,
                email: data.email
            })
        }
    }
    async handleModify() {
        const reg = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_-]+)(\.[a-zA-Z0-9_-]+)$/i
        if (!this.state.email) {
            setMessage('请填写邮箱地址!')
            return
        } else if (!reg.test(this.state.email)) {
            setMessage('邮箱格式错误!')
            return
        }
        const { code, data } = await api.post('frontend/user/account', {
            ...this.state,
            id: this.props.global.cookies.userid
        })

        if (code === 200) {
            setMessage({ type: 'success', content: data })
            this.props.setCookis({
                ...this.props.global.cookies,
                useremail: this.state.email
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
                                <AInput title="昵称">
                                    <input
                                        value={this.state.username}
                                        type="text"
                                        placeholder="昵称"
                                        className="base-input"
                                        name="username"
                                        readOnly
                                    />
                                    <span className="input-info error">请输入昵称</span>
                                </AInput>
                                <AInput title="邮箱">
                                    <input
                                        value={this.state.email}
                                        onChange={e => this.setState({ email: e.target.value })}
                                        type="text"
                                        placeholder="邮箱"
                                        className="base-input"
                                        name="email"
                                    />
                                    <span className="input-info error">请输入邮箱</span>
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
export default UserAccount
