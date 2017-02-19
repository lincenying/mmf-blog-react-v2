import React from 'react'
import Link from 'react-router/lib/Link'

export default () => {
    return (
        <div className="main-right">
            <div className="card card-me">
                <Link to="/backend/admin/list" active-className="active" className="side-entry"><i className="icon icon-arrow-right" /><i className="icon icon-articles" />管理帐号</Link>
                <Link to="/backend/user/list" active-className="active" className="side-entry"><i className="icon icon-arrow-right" /><i className="icon icon-articles" />用户列表</Link>
            </div>
            <div className="card card-me">
                <Link to="/backend/category/insert" active-className="active" className="side-entry"><i className="icon icon-arrow-right" /><i className="icon icon-articles" />添加分类</Link>
                <Link to="/backend/category/list" active-className="active" className="side-entry"><i className="icon icon-arrow-right" /><i className="icon icon-articles" />管理分类</Link>
                <Link to="/backend/article/insert" active-className="active" className="side-entry"><i className="icon icon-arrow-right" /><i className="icon icon-articles" />发布文章</Link>
                <Link to="/backend/article/list" active-className="active" className="side-entry"><i className="icon icon-arrow-right" /><i className="icon icon-articles" />管理文章</Link>
            </div>
        </div>
    )
}
