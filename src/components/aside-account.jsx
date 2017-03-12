import React from 'react'
import Link from 'react-router/lib/Link'
import api from '~api'

const handleLogout = async () => {
    await api.post('frontend/user/logout', {})
    window.location.href = '/'
}

const AsideAccount =  () => {
    return (
        <div className="card card-me">
            <Link to="/user/account" activeClassName="active" className="side-entry"><i className="icon icon-arrow-right" /><i className="icon icon-articles" />帐号</Link>
            <Link to="/user/password" activeClassName="active" className="side-entry"><i className="icon icon-arrow-right" /><i className="icon icon-articles" />密码</Link>
            <a href="javascript:;" onClick={handleLogout} className="side-entry"><i className="icon icon-arrow-right" /><i className="icon icon-articles" />退出</a>
        </div>
    )
}
export default AsideAccount
