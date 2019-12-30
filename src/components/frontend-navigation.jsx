import md5 from 'md5'
import React, { Component } from 'react'
//import withRouter from 'react-router-dom/withRouter'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import { connect } from 'react-redux'
//import Route from 'react-router-dom/Route'
import { Link, NavLink } from 'react-router-dom'

@connect(
    state => ({
        global: state.global.toJS()
    }),
    dispatch => ({ dispatch })
)
@immutableRenderDecorator
//@withRouter
class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: !!this.props.global.cookies.user
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
    avatar(email = 'lincenying@126.com') {
        return `https://fdn.geekzu.org/avatar/${md5(email)}?s=256&d=identicon&r=g`
    }
    render() {
        const loginText = this.state.isLogin ? (
            <span className="nav-me">
                <Link to="/user/account" className="nav-me-link">
                    <img src={this.avatar(this.props.global.cookies.useremail)} className="nav-avatar-img" />
                </Link>
            </span>
        ) : (
            <span className="nav-me">
                <a onClick={this.handleLogin} href={null} className="nav-me-link">
                    <img src={this.avatar('')} className="nav-avatar-img" />
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
                            <input onKeyUp={this.handleSearch} placeholder="记得按回车哦" className="nav-search-input" />
                        </span>
                        {loginText}
                    </div>
                </div>
            </nav>
        )
    }
}
export default Navigation
