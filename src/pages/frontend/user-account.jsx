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
        this.handleLoadMore = this.handleLoadMore.bind(this)
    }
    handleLoadMore() {
    }
    render() {
        return (
            <div className="main wrap clearfix">
                <div className="main-left">
                    <div className="home-feeds cards-wrap">
                        <div className="settings-main card">
                            <div className="settings-main-content">
                                <aInput title="昵称">
                                    <input type="text" v-model="form.username" placeholder="昵称" className="base-input" name="username" />
                                    <span className="input-info error">请输入昵称</span>
                                </aInput>
                                <aInput title="邮箱">
                                    <input type="text" v-model="form.email" placeholder="邮箱" className="base-input" name="email" />
                                    <span className="input-info error">请输入邮箱</span>
                                </aInput>
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
