import React from 'react'
import Link from 'react-router/lib/Link'

export default () => {
    return (
        <div class="card card-me">
            <Link to="/user/account" active-class="active" class="side-entry"><i class="icon icon-arrow-right" /><i class="icon icon-articles" />帐号</Link>
            <Link to="/user/password" active-class="active" class="side-entry"><i class="icon icon-arrow-right" /><i class="icon icon-articles" />密码</Link>
        </div>
    )
}
