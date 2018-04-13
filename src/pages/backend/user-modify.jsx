import React, { Component } from 'react'
import Link from 'react-router-dom/Link'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import { getUserItem } from '~reducers/backend/user'
import { setMessage } from '~utils'
import api from '~api'
import AInput from '~components/_input.jsx'

function mapStateToProps(state) {
    return {
        user: state.backendUser.toJS(),
    }
}
function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators({ getUserItem }, dispatch)
    return { ...actions, dispatch }
}

@connect(mapStateToProps, mapDispatchToProps)
@immutableRenderDecorator
export default class UserModify extends Component {
    constructor(props) {
        super(props)
        const { username, email } = props.user.item.data
        this.state = {
            username: username || '',
            email: email || '',
            password: '',
        }
        this.handleModify = this.handleModify.bind(this)
    }
    componentWillMount() {
        this.props.getUserItem({ id: this.props.match.params.id })
    }
    componentDidUpdate(prevProps) {
        const { username, email } = this.props.user.item.data
        if (prevProps.user.item.data.username !== username) {
            this.setState({ username, email })
        }
    }
    async handleModify() {
        if (!this.state.username || !this.state.email) {
            setMessage('请将表单填写完整!')
            return
        }
        const item = {
            ...this.state,
            id: this.props.match.params.id,
        }
        const {
            data: { message, code, data },
        } = await api.post('backend/user/modify', item)
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            this.props.dispatch({ type: 'updateUserItem', data })
            this.props.history.push('/backend/user/list')
        }
    }
    render() {
        return (
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
                <div className="settings-footer clearfix">
                    <Link to="/backend/user/list" className="btn btn-blue">
                        返回
                    </Link>
                    <a onClick={this.handleModify} href="javascript:;" className="btn btn-yellow">
                        编辑管理员
                    </a>
                </div>
            </div>
        )
    }
}
