import React, { Component } from 'react'
import { connect } from 'react-redux'
//import Route from 'react-router-dom/Route'
import Link from 'react-router-dom/Link'
import NavLink from 'react-router-dom/NavLink'
//import withRouter from 'react-router-dom/withRouter'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import cookies from 'js-cookie'

function mapStateToProps(state) {
    return {
        global: state.global.toJS(),
    }
}
function mapDispatchToProps(dispatch) {
    return { dispatch }
}

@connect(mapStateToProps, mapDispatchToProps)
@immutableRenderDecorator
//@withRouter
export default class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: cookies.get('user'),
        }
        this.handleLogin = this.handleLogin.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }
    handleLogin() {
        this.props.dispatch({ type: 'showLoginModal', payload: true })
    }
    handleSearch(e) {
        var key = e.target.value
        if (e.keyCode === 13 && key !== '') {
            this.props.history.push(`/search/${key}`)
        }
    }
    render() {
        const loginText = this.state.isLogin ? (
            <span className="nav-me">
                <Link to="/user/account" className="nav-me-link">
                    <img src="//ww2.sinaimg.cn/large/005uQRNCgw1f4ij3d8m05j301s01smwx.jpg" className="nav-avatar-img" />
                </Link>
            </span>
        ) : (
            <span className="nav-me">
                <a onClick={this.handleLogin} href="javascript:;" className="nav-me-link">
                    <img src="//ww2.sinaimg.cn/large/005uQRNCgw1f4ij3d8m05j301s01smwx.jpg" className="nav-avatar-img" />
                </a>
            </span>
        )
        return (
            <nav className="global-nav">
                <div className="wrap">
                    <div className="left-part">
                        <Link to="/" className="logo-link">
                            <i className="icon icon-nav-logo" />
                            <span className="hidden">M.M.F 小屋</span>
                        </Link>
                        <div className="main-nav">
                            <NavLink activeClassName="current" to="/" exact className="nav-link">
                                <i className="icon icon-nav-home" />
                                <span className="text">首页</span>
                            </NavLink>
                            <NavLink activeClassName="current" to="/trending/visit" className="nav-link">
                                <i className="icon icon-nav-explore" />
                                <span className="text">热门</span>
                            </NavLink>
                            <NavLink activeClassName="current" to="/about" className="nav-link">
                                <i className="icon icon-nav-features" />
                                <span className="text">关于</span>
                            </NavLink>
                        </div>
                    </div>
                    <div className="right-part">
                        <span className="nav-search">
                            <i className="icon icon-search-white" />
                            <input
                                onKeyUp={this.handleSearch}
                                placeholder="记得按回车哦"
                                className="nav-search-input"
                            />
                        </span>
                        {loginText}
                    </div>
                </div>
            </nav>
        )
    }
}
