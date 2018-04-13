import React, { Component } from 'react'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'

import api from '~api'
import { propTypes } from '~decorators'
import AInput from '~components/_input.jsx'
import Account from '~components/aside-account.jsx'

@immutableRenderDecorator
@propTypes({})
export default class UserAccount extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
        }
        this.getUser = this.getUser.bind(this)
    }
    componentWillMount() {
        this.getUser()
    }
    async getUser() {
        const {
            data: { code, data },
        } = await api.get('frontend/user/account')
        if (code === 200) {
            this.setState({
                username: data.username,
                email: data.email,
            })
        }
    }
    render() {
        return (
            <div className="main wrap clearfix">
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
                                        type="text"
                                        placeholder="邮箱"
                                        className="base-input"
                                        name="email"
                                        readOnly
                                    />
                                    <span className="input-info error">请输入邮箱</span>
                                </AInput>
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
