import React from 'react'
import Link from 'react-router/lib/Link'

export default () => {
    return (
        <div className="card card-me">
            <Link to="/user/account" active-className="active" className="side-entry"><i className="icon icon-arrow-right" /><i className="icon icon-articles" />帐号</Link>
            <Link to="/user/password" active-className="active" className="side-entry"><i className="icon icon-arrow-right" /><i className="icon icon-articles" />密码</Link>
        </div>
    )
}
