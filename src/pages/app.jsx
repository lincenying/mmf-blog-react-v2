import React from 'react'
import Router from 'react-router-dom/BrowserRouter'
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'
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

const App = () => {
    return (
        <Router>
            <Route render={({ location, history }) =>
                <div id="app" className="g-doc">
                    <FrontendNavigation location={location} history={history} />
                    <CSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300} component="div">
                        <Switch key={location.pathname}>
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
            }
            />
        </Router>
    )
}
export default App
