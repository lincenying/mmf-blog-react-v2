import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'

const BackendMenu = props => {
    const isLogin = props.location.pathname !== '/backend'
    return !isLogin ? (
        <span />
    ) : (
        <div className="main-right">
            <div className="card card-me">
                <NavLink to="/backend/admin/list" activeClassName="active" className="side-entry">
                    <i className="icon icon-arrow-right" />
                    <i className="icon icon-articles" />
                    管理帐号
                </NavLink>
                <NavLink to="/backend/user/list" activeClassName="active" className="side-entry">
                    <i className="icon icon-arrow-right" />
                    <i className="icon icon-articles" />
                    用户列表
                </NavLink>
            </div>
            <div className="card card-me">
                <NavLink to="/backend/category/insert" activeClassName="active" className="side-entry">
                    <i className="icon icon-arrow-right" />
                    <i className="icon icon-articles" />
                    添加分类
                </NavLink>
                <NavLink to="/backend/category/list" activeClassName="active" className="side-entry">
                    <i className="icon icon-arrow-right" />
                    <i className="icon icon-articles" />
                    管理分类
                </NavLink>
                <NavLink to="/backend/article/insert" activeClassName="active" className="side-entry">
                    <i className="icon icon-arrow-right" />
                    <i className="icon icon-articles" />
                    发布文章
                </NavLink>
                <NavLink to="/backend/article/list" activeClassName="active" className="side-entry">
                    <i className="icon icon-arrow-right" />
                    <i className="icon icon-articles" />
                    管理文章
                </NavLink>
            </div>
        </div>
    )
}
export default withRouter(BackendMenu)
