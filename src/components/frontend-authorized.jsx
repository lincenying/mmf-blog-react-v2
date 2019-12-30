import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const FrontendAuthorized = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={renderProps => {
                return rest.global.cookies.user ? (
                    <Component {...renderProps} global={rest.global} />
                ) : (
                    <Redirect to={{ pathname: '/', state: { from: renderProps.location } }} />
                )
            }}
        />
    )
}
export default FrontendAuthorized
