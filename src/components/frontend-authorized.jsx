import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import cookies from 'js-cookie'

export default ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={renderProps => {
                return cookies.get('user') ? (
                    <Component {...renderProps} />
                ) : (
                    <Redirect to={{ pathname: '/', state: { from: renderProps.location } }} />
                )
            }}
        />
    )
}
