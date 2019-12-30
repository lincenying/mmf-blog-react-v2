import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const BackendAuthorized = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={renderProps => {
                return rest.global.cookies.b_user ? (
                    <Component {...renderProps} />
                ) : (
                    <Redirect to={{ pathname: '/backend', state: { from: renderProps.location } }} />
                )
            }}
        />
    )
}
export default BackendAuthorized
