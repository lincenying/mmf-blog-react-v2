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
        this.handleLoadMore = this.handleLoadMore.bind(this)
    }
    handleLoadMore() {
    }
    render() {
        return (
            <div class="main wrap clearfix">
                <div class="main-left">
                    <div class="home-feeds cards-wrap">
                        <div class="settings-main card">
                            <div class="settings-main-content">
                                <aInput title="昵称">
                                    <input type="text" v-model="form.username" placeholder="昵称" class="base-input" name="username" />
                                    <span class="input-info error">请输入昵称</span>
                                </aInput>
                                <aInput title="邮箱">
                                    <input type="text" v-model="form.email" placeholder="邮箱" class="base-input" name="email" />
                                    <span class="input-info error">请输入邮箱</span>
                                </aInput>
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
