import React from 'react'
import { NavLink } from 'react-router-dom'
import api from '~/api'

const handleLogout = async () => {
    await api.post('frontend/user/logout', {})
    window.location.href = '/'
}

const AsideAccount = () => {
    return (
        <div className="card card-me">
            <NavLink to="/user/account" activeClassName="active" className="side-entry">
                <i className="icon icon-arrow-right" />
                <i className="icon icon-articles" />
                帐号
            </NavLink>
            <NavLink to="/user/password" activeClassName="active" className="side-entry">
                <i className="icon icon-arrow-right" />
                <i className="icon icon-articles" />
                密码
            </NavLink>
            <a href={null} onClick={handleLogout} className="side-entry">
                <i className="icon icon-arrow-right" />
                <i className="icon icon-articles" />
                退出
            </a>
        </div>
    )
}
export default AsideAccount
