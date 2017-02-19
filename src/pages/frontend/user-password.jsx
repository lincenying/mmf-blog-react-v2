import React, {Component} from 'react'
import {connect} from 'react-redux'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'
import {propTypes} from '~decorators'
import aInput from '../../components/_input.jsx'
import account from '../../components/aside-account.jsx'

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
        this.state = {
        }
        this.handleModify = this.handleModify.bind(this)
    }
    handleModify() {
    }
    render() {
        return (
            <div class="main wrap clearfix">
                <div class="main-left">
                    <div class="home-feeds cards-wrap">
                        <div class="settings-main card">
                            <div class="settings-main-content">
                                <aInput title="当前密码">
                                    <input type="password" placeholder="当前密码" class="base-input" name="old_password" />
                                </aInput>
                                <aInput title="新的密码">
                                    <input type="password" placeholder="新的密码" class="base-input" name="password" />
                                </aInput>
                                <aInput title="确认密码">
                                    <input type="password" placeholder="确认密码" class="base-input" name="re_password" />
                                </aInput>
                            </div>
                            <div class="settings-footer clearfix">
                                <a onClick={this.handleModify} href="javascript:;" class="btn btn-yellow">保存设置</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main-right">
                    <account />
                </div>
            </div>
        )
    }
}
