import React from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import DevTools from '~devtools'
import Navigation from '~components/backend-navigation.jsx'
import BackendMenu from '~components/backend-menu.jsx'
import MatchWhenAuthorized from '~components/backend-authorized.jsx'

import AdminList from './backend/admin-list.jsx'
import AdminModify from './backend/admin-modify.jsx'
import ArticleList from './backend/article-list.jsx'
import ArticleInsert from './backend/article-insert.jsx'
import ArticleModify from './backend/article-modify.jsx'
import CategoryInsert from './backend/category-insert.jsx'
import CategoryList from './backend/category-list.jsx'
import CategoryModify from './backend/category-modify.jsx'
import Comment from './backend/comment.jsx'
import Login from './backend/login.jsx'
import UserList from './backend/user-list.jsx'
import UserModify from './backend/user-modify.jsx'

import 'assets/css/hljs/googlecode.css'
import 'assets/css/style.css'
import 'nprogress/nprogress.css'
import 'toastr/build/toastr.min.css'

const Backend = props => {
    return (
        <div id="app" className="g-doc">
            <Navigation />
            <div className="main wrap clearfix">
                <div className="main-left">
                    <div className="home-feeds cards-wrap">
                        <TransitionGroup appear>
                            <CSSTransition
                                classNames="example"
                                in={false}
                                key={props.location.key}
                                timeout={{ appear: 3000, enter: 3000, exit: 300 }}
                            >
                                <Switch key={props.location.pathname} location={props.location}>
                                    <Route name="backend" path="/backend" component={Login} exact />
                                    <MatchWhenAuthorized
                                        name="admin_list"
                                        path="/backend/admin/list"
                                        component={AdminList}
                                    />
                                    <MatchWhenAuthorized
                                        name="admin_modify"
                                        path="/backend/admin/modify/:id"
                                        component={AdminModify}
                                    />
                                    <MatchWhenAuthorized
                                        name="article_insert"
                                        path="/backend/article/list"
                                        component={ArticleList}
                                    />
                                    <MatchWhenAuthorized
                                        name="article_insert"
                                        path="/backend/article/insert"
                                        component={ArticleInsert}
                                    />
                                    <MatchWhenAuthorized
                                        name="article_modify"
                                        path="/backend/article/modify/:id"
                                        component={ArticleModify}
                                    />
                                    <MatchWhenAuthorized
                                        name="article_comment"
                                        path="/backend/article/comment/:id"
                                        component={Comment}
                                    />
                                    <MatchWhenAuthorized
                                        name="category_list"
                                        path="/backend/category/list"
                                        component={CategoryList}
                                    />
                                    <MatchWhenAuthorized
                                        name="category_insert"
                                        path="/backend/category/insert"
                                        component={CategoryInsert}
                                    />
                                    <MatchWhenAuthorized
                                        name="category_modify"
                                        path="/backend/category/modify/:id"
                                        component={CategoryModify}
                                    />
                                    <MatchWhenAuthorized
                                        name="user_list"
                                        path="/backend/user/list"
                                        component={UserList}
                                    />
                                    <MatchWhenAuthorized
                                        name="user_modify"
                                        path="/backend/user/modify/:id"
                                        component={UserModify}
                                    />
                                </Switch>
                            </CSSTransition>
                        </TransitionGroup>
                    </div>
                </div>
                <BackendMenu />
            </div>
            <DevTools />
        </div>
    )
}
export default withRouter(Backend)
