import React, {Component} from 'react'
import Link from 'react-router/lib/Link'
import {connect} from 'react-redux'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'
import cookies from 'js-cookie'
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
        this.state = {
            isLogin: cookies.get('user')
        }
        this.handleLogin = this.handleLogin.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }
    handleLogin() {
    }
    handleSearch() {

    }
    render() {
        const loginText = this.isLogin ?
            <span v-if="isLogin" class="nav-me"><Link to="/user/account" class="nav-me-link"><img src="//ww2.sinaimg.cn/large/005uQRNCgw1f4ij3d8m05j301s01smwx.jpg" class="nav-avatar-img" /></Link></span> :
            <span v-else class="nav-me"><a onClick={this.handleLogin} href="javascript:;" class="nav-me-link"><img src="//ww2.sinaimg.cn/large/005uQRNCgw1f4ij3d8m05j301s01smwx.jpg" class="nav-avatar-img" /></a></span>
        return (
            <nav class="global-nav">
                <div v-if="backend" class="wrap clearfix">
                    <div class="left-part"><a href="/" class="logo-link"><i class="icon icon-nav-logo" /><span class="hidden">M.M.F 小屋</span></a>
                        <div class="main-nav">
                            <a href="/" class="nav-link"><i class="icon icon-nav-home" /><span class="text">首页</span></a>
                            <a href="/trending/visit" class="nav-link"><i class="icon icon-nav-explore" /><span class="text">热门</span></a>
                            <a href="/about" class="nav-link"><i class="icon icon-nav-features" /><span class="text">关于</span></a>
                        </div>
                    </div>
                </div>
                <div v-else class="wrap clearfix">
                    <div class="left-part">
                        <Link to="/" active-class="current" class="logo-link"><i class="icon icon-nav-logo" /><span class="hidden">M.M.F 小屋</span></Link>
                        <div class="main-nav">
                            <Link to="/" active-class="current" class="nav-link"><i class="icon icon-nav-home" /><span class="text">首页</span></Link>
                            <Link to="/trending/visit" active-class="current" class="nav-link"><i class="icon icon-nav-explore" /><span class="text">热门</span></Link>
                            <Link to="/about" active-class="current" class="nav-link"><i class="icon icon-nav-features" /><span class="text">关于</span></Link>
                        </div>
                    </div>
                    <div class="right-part">
                        <span class="nav-search"><i class="icon icon-search-white" /><input onKeyup={this.handleSearch} placeholder="记得按回车哦" class="nav-search-input" /></span>
                        { loginText }
                    </div>
                </div>
            </nav>
        )
    }
}
