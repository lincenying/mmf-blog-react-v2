import React from 'react'
import browserHistory from 'react-router/lib/browserHistory'
import IndexRoute from 'react-router/lib/IndexRoute'
import Route from 'react-router/lib/Route'
import Router from 'react-router/lib/Router'
import {Provider} from 'react-redux'
import {syncHistoryWithStore} from 'react-router-redux'
import cookies from 'js-cookie'

import NotFound from './pages/404.jsx'
import Backend from './pages/backend.jsx'
import AdminList from './pages/backend/admin-list.jsx'
import AdminModify from './pages/backend/admin-modify.jsx'
import ArticleList from './pages/backend/article-list.jsx'
import ArticleInsert from './pages/backend/article-insert.jsx'
import ArticleModify from './pages/backend/article-modify.jsx'
import CategoryInsert from './pages/backend/category-insert.jsx'
import CategoryList from './pages/backend/category-list.jsx'
import CategoryModify from './pages/backend/category-modify.jsx'
import Comment from './pages/backend/comment.jsx'
import Login from './pages/backend/login.jsx'
import UserList from './pages/backend/user-list.jsx'
import UserModify from './pages/backend/user-modify.jsx'

const checkLogin = (nextState, replace, callback) => {
    var token = cookies.get('b_user')
    if (!token) {
        replace('/')
    }
    callback()
}

const RouterWrap = ({store}) => {
    const history = syncHistoryWithStore(browserHistory, store)
    return (
        <Provider store={store}>
            <Router history={history}>
                <Route name="backend" needLogin="1" path="/backend" component={Backend} onEnter={checkLogin} >
                    <IndexRoute name="login" component={Login} />
                    <Route name="admin_list" path="/backend/admin/list" component={AdminList} />
                    <Route name="admin_modify" path="/backend/admin/modify/:id" component={AdminModify} />
                    <Route name="article_insert" path="/backend/article/list" component={ArticleList} />
                    <Route name="article_insert" path="/backend/article/insert" component={ArticleInsert} />
                    <Route name="article_modify" path="/backend/article/modify/:id" component={ArticleModify} />
                    <Route name="article_comment" path="/backend/article/comment/:id" component={Comment} />
                    <Route name="category_list" path="/backend/category/list" component={CategoryList} />
                    <Route name="category_insert" path="/backend/category/insert" component={CategoryInsert} />
                    <Route name="category_modify" path="/backend/category/modify/:id" component={CategoryModify} />
                    <Route name="user_list" path="/backend/user/list" component={UserList} />
                    <Route name="user_modify" path="/backend/user/modify/:id" component={UserModify} />
                </Route>
                <Route component={NotFound} path="*" />
            </Router>
        </Provider>
    )
}
export default RouterWrap
