/* eslint-disable react/require-optimization, no-inline-comments */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Route, Switch } from 'react-router-dom'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import DevTools from '~devtools'
import Sign from '~components/sign.jsx'
import FrontendNavigation from '~components/frontend-navigation.jsx'
import MatchWhenAuthorized from '~components/frontend-authorized.jsx'

import About from './frontend/about.jsx'
import Main from './frontend/topics.jsx'
import Article from './frontend/article.jsx'
import userAccount from './frontend/user-account.jsx'
import userPassword from './frontend/user-password.jsx'

import "assets/css/hljs/googlecode.css"
import "assets/css/style.css"
import 'nprogress/nprogress.css'
import 'toastr/build/toastr.min.css'

@withRouter
export default class App extends Component {
    static propTypes = {
        location: PropTypes.shape({
            key: PropTypes.string,
            pathname: PropTypes.string.isRequired,
        })
    }
    render() {
        return (
            <div id="app" className="g-doc">
                <FrontendNavigation location={this.props.location} history={this.props.history} />
                <CSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300} component="div">
                    <Switch key={this.props.location.pathname} location={this.props.location} >
                        {/*使用上面一行, 可以使用动画, 但是将不能使用滚动条记录, 开启下面一行则反之*/}
                        {/*<Switch>*/}
                        <Route name="index" path="/" component={Main} exact />
                        <Route name="trending" path="/trending/:by" component={Main} />
                        <Route name="category" path="/category/:id" component={Main} />
                        <Route name="search" path="/search/:key" component={Main} />
                        <Route name="article" path="/article/:id" component={Article} />
                        <Route name="about" path="/about" component={About} />
                        <MatchWhenAuthorized name="account" path="/user/account" component={userAccount} />
                        <MatchWhenAuthorized name="password" path="/user/password" component={userPassword} />
                    </Switch>
                </CSSTransitionGroup>
                <Sign />
                <DevTools />
            </div>
        )
    }
}
