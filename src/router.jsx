import React from 'react'
import browserHistory from 'react-router/lib/browserHistory'
import IndexRoute from 'react-router/lib/IndexRoute'
import Route from 'react-router/lib/Route'
import Router from 'react-router/lib/Router'
import {Provider} from 'react-redux'
import {syncHistoryWithStore} from 'react-router-redux'
//import cookies from 'js-cookie'
import ls from 'store2'

import NotFound from './pages/404.jsx'
import App from './pages/app.jsx'
import About from './pages/frontend/about.jsx'
import Main from './pages/frontend/topics.jsx'
import Article from './pages/frontend/article.jsx'
import userAccount from './pages/frontend/user-account.jsx'
import userPassword from './pages/frontend/user-password.jsx'

// const checkLogin = (nextState, replace, callback) => {
//     var token = cookies.get('user')
//     if (!token) {
//         replace('/')
//     }
//     callback()
// }
const savePosition = router => {
    const scrollTop = document.body.scrollTop
    const path = router.location.pathname
    if (path) {
        if (scrollTop) ls.set(path, scrollTop)
        if (ls.get(path) && !scrollTop) ls.remove(path)
    }
}
const goScrollTop = () => {
    window.scrollTo(0, 0)
}

export default ({store}) => {
    const history = syncHistoryWithStore(browserHistory, store)
    return (
        <Provider store={store}>
            <Router history={history}>
                <Route name="index" needLogin="0" path="/" component={App}>
                    <IndexRoute component={Main} onLeave={savePosition} />
                    <Route name="trending" path="/trending/:by" component={Main} onLeave={savePosition} />
                    <Route name="category" path="/category/:id" component={Main} onLeave={savePosition} />
                    <Route name="search" path="/search/:key" component={Main} onLeave={savePosition} />
                    <Route name="article" path="/article/:id" component={Article} onEnter={goScrollTop} />
                    <Route name="about" path="/about" component={About} onEnter={goScrollTop} />
                    <Route name="account" path="/user/account" component={userAccount} onEnter={goScrollTop} />
                    <Route name="password" path="/user/password" component={userPassword} onEnter={goScrollTop} />
                </Route>
                <Route component={NotFound} path="*" />
            </Router>
        </Provider>
    )
}
/*
<Route name="backend" needLogin="1" path="/backend" component={App} >
    <Route name="login" path="/backend/login" component={Article} />
    <Route name="admin_list" path="/backend/admin/list" component={Article} />
    <Route name="admin_modify" path="/backend/admin/modify/:id" component={Article} />
    <Route name="article_insert" path="/backend/article/insert" component={Article} />
    <Route name="article_modify" path="/backend/article/modify/:id" component={Article} />
    <Route name="article_comment" path="/backend/comment/:id" component={Article} />
    <Route name="category_list" path="/backend/category/list" component={Article} />
    <Route name="category_insert" path="/backend/category/insert" component={Article} />
    <Route name="category_modify" path="/backend/category/modify/:id" component={Article} />
    <Route name="user_list" path="/backend/user/list" component={Article} />
    <Route name="user_modify" path="/backend/user/modify/:id" component={Article} />
</Route>
*/
