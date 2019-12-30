/* eslint-disable react/require-optimization */
import DevTools from '@devtools'
import 'nprogress/nprogress.css'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import 'toastr/build/toastr.min.css'
import '~/assets/css/hljs/googlecode.css'
import '~/assets/less/style.less'
import MatchWhenAuthorized from '~/components/backend-authorized.jsx'
import BackendMenu from '~/components/backend-menu.jsx'
import Navigation from '~/components/backend-navigation.jsx'
import AdminList from './backend/admin-list.jsx'
import AdminModify from './backend/admin-modify.jsx'
import ArticleInsert from './backend/article-insert.jsx'
import ArticleList from './backend/article-list.jsx'
import ArticleModify from './backend/article-modify.jsx'
import CategoryInsert from './backend/category-insert.jsx'
import CategoryList from './backend/category-list.jsx'
import CategoryModify from './backend/category-modify.jsx'
import Comment from './backend/comment.jsx'
import Login from './backend/login.jsx'
import UserList from './backend/user-list.jsx'
import UserModify from './backend/user-modify.jsx'

@connect(state => ({
    global: state.global.toJS()
}))
@withRouter
class Backend extends Component {
    static propTypes = {
        location: PropTypes.shape({
            key: PropTypes.string,
            pathname: PropTypes.string.isRequired
        })
    }
    render() {
        return (
            <div id="app" className="backend">
                <Navigation />
                <div className="main wrap">
                    <div className="main-left">
                        <div className="home-feeds cards-wrap">
                            <TransitionGroup appear>
                                <CSSTransition
                                    classNames="example"
                                    in={false}
                                    key={this.props.location.key}
                                    timeout={{ appear: 3000, enter: 3000, exit: 300 }}
                                >
                                    <Switch key={this.props.location.pathname} location={this.props.location}>
                                        <Route name="backend" path="/backend" component={Login} exact />
                                        <MatchWhenAuthorized
                                            name="admin_list"
                                            path="/backend/admin/list"
                                            global={this.props.global}
                                            component={AdminList}
                                        />
                                        <MatchWhenAuthorized
                                            name="admin_modify"
                                            path="/backend/admin/modify/:id"
                                            global={this.props.global}
                                            component={AdminModify}
                                        />
                                        <MatchWhenAuthorized
                                            name="article_insert"
                                            path="/backend/article/list"
                                            global={this.props.global}
                                            component={ArticleList}
                                        />
                                        <MatchWhenAuthorized
                                            name="article_insert"
                                            path="/backend/article/insert"
                                            global={this.props.global}
                                            component={ArticleInsert}
                                        />
                                        <MatchWhenAuthorized
                                            name="article_modify"
                                            path="/backend/article/modify/:id"
                                            global={this.props.global}
                                            component={ArticleModify}
                                        />
                                        <MatchWhenAuthorized
                                            name="article_comment"
                                            path="/backend/article/comment/:id"
                                            global={this.props.global}
                                            component={Comment}
                                        />
                                        <MatchWhenAuthorized
                                            name="category_list"
                                            path="/backend/category/list"
                                            global={this.props.global}
                                            component={CategoryList}
                                        />
                                        <MatchWhenAuthorized
                                            name="category_insert"
                                            path="/backend/category/insert"
                                            global={this.props.global}
                                            component={CategoryInsert}
                                        />
                                        <MatchWhenAuthorized
                                            name="category_modify"
                                            path="/backend/category/modify/:id"
                                            global={this.props.global}
                                            component={CategoryModify}
                                        />
                                        <MatchWhenAuthorized
                                            name="user_list"
                                            path="/backend/user/list"
                                            global={this.props.global}
                                            component={UserList}
                                        />
                                        <MatchWhenAuthorized
                                            name="user_modify"
                                            path="/backend/user/modify/:id"
                                            global={this.props.global}
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
}
export default withRouter(Backend)
