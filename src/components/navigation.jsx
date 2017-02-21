import React, {Component} from 'react'
import Link from 'react-router/lib/Link'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'
import cookies from 'js-cookie'
import {propTypes} from '~decorators'

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
        const loginText = this.state.isLogin ?
            <span className="nav-me"><Link to="/user/account" className="nav-me-link"><img src="//ww2.sinaimg.cn/large/005uQRNCgw1f4ij3d8m05j301s01smwx.jpg" className="nav-avatar-img" /></Link></span> :
            <span className="nav-me"><a onClick={this.handleLogin} href="javascript:;" className="nav-me-link"><img src="//ww2.sinaimg.cn/large/005uQRNCgw1f4ij3d8m05j301s01smwx.jpg" className="nav-avatar-img" /></a></span>
        const menu = this.props.backend ?
            <div className="wrap clearfix">
                <div className="left-part"><a href="/" className="logo-link"><i className="icon icon-nav-logo" /><span className="hidden">M.M.F 小屋</span></a>
                    <div className="main-nav">
                        <a href="/" className="nav-link"><i className="icon icon-nav-home" /><span className="text">首页</span></a>
                        <a href="/trending/visit" className="nav-link"><i className="icon icon-nav-explore" /><span className="text">热门</span></a>
                        <a href="/about" className="nav-link"><i className="icon icon-nav-features" /><span className="text">关于</span></a>
                    </div>
                </div>
            </div> :
            <div className="wrap clearfix">
                <div className="left-part">
                    <Link to="/" activeClassName="current" className="logo-link"><i className="icon icon-nav-logo" /><span className="hidden">M.M.F 小屋</span></Link>
                    <div className="main-nav">
                        <Link to="/" activeClassName="current" className="nav-link"><i className="icon icon-nav-home" /><span className="text">首页</span></Link>
                        <Link to="/trending/visit" activeClassName="current" className="nav-link"><i className="icon icon-nav-explore" /><span className="text">热门</span></Link>
                        <Link to="/about" activeClassName="current" className="nav-link"><i className="icon icon-nav-features" /><span className="text">关于</span></Link>
                    </div>
                </div>
                <div className="right-part">
                    <span className="nav-search"><i className="icon icon-search-white" /><input onKeyUp={this.handleSearch} placeholder="记得按回车哦" className="nav-search-input" /></span>
                    { loginText }
                </div>
            </div>
        return (
            <nav className="global-nav">
                {menu}
            </nav>
        )
    }
}
