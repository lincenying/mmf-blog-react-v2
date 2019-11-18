/* eslint-disable react/require-optimization, no-inline-comments */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Route, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'

import DevTools from '@devtools'
import Sign from '@/components/sign.jsx'
import FrontendNavigation from '@/components/frontend-navigation.jsx'
import MatchWhenAuthorized from '@/components/frontend-authorized.jsx'

import About from './frontend/about.jsx'
import Main from './frontend/topics.jsx'
import Article from './frontend/article.jsx'
import userAccount from './frontend/user-account.jsx'
import userPassword from './frontend/user-password.jsx'

import '@/assets/css/hljs/googlecode.css'
import '@/assets/less/style.less'
import 'nprogress/nprogress.css'
import 'toastr/build/toastr.min.css'

@connect(state => ({
    global: state.global.toJS()
}))
@withRouter
class App extends Component {
    static propTypes = {
        location: PropTypes.shape({
            key: PropTypes.string,
            pathname: PropTypes.string.isRequired
        })
    }
    render() {
        return (
            <div id="app" className={this.props.location.pathname.indexOf('backend') >= 0 ? 'backend' : 'frontend'}>
                <FrontendNavigation location={this.props.location} history={this.props.history} />
                <TransitionGroup appear>
                    <CSSTransition classNames="example" in={false} key={this.props.location.key} timeout={{ appear: 3000, enter: 3000, exit: 300 }}>
                        <Switch key={this.props.location.pathname} location={this.props.location}>
                            <Route name="index" path="/" component={Main} exact />
                            <Route name="trending" path="/trending/:by" component={Main} />
                            <Route name="category" path="/category/:id" component={Main} />
                            <Route name="search" path="/search/:key" component={Main} />
                            <Route name="article" path="/article/:id" component={Article} />
                            <Route name="about" path="/about" component={About} />
                            <MatchWhenAuthorized name="account" path="/user/account" global={this.props.global} component={userAccount} />
                            <MatchWhenAuthorized name="password" path="/user/password" global={this.props.global} component={userPassword} />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Sign />
                <DevTools />
            </div>
        )
    }
}
export default App
