import React, {Component} from 'react'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'
import {propTypes} from '~decorators'
import aInput from '../../components/_input.jsx'
import account from '../../components/aside-account.jsx'

@immutableRenderDecorator
@propTypes({

})
export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.handleModify = this.handleModify.bind(this)
    }
    handleModify() {
    }
    render() {
        return (
            <div className="main wrap clearfix">
                <div className="main-left">
                    <div className="home-feeds cards-wrap">
                        <div className="settings-main card">
                            <div className="settings-main-content">
                                <aInput title="当前密码">
                                    <input type="password" placeholder="当前密码" className="base-input" name="old_password" />
                                </aInput>
                                <aInput title="新的密码">
                                    <input type="password" placeholder="新的密码" className="base-input" name="password" />
                                </aInput>
                                <aInput title="确认密码">
                                    <input type="password" placeholder="确认密码" className="base-input" name="re_password" />
                                </aInput>
                            </div>
                            <div className="settings-footer clearfix">
                                <a onClick={this.handleModify} href="javascript:;" className="btn btn-yellow">保存设置</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-right">
                    <account />
                </div>
            </div>
        )
    }
}
