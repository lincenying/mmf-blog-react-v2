import React from 'react'
import Route from 'react-router-dom/Route'
import Redirect from 'react-router-dom/Redirect'
import cookies from 'js-cookie'

export default ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={renderProps => {
            return cookies.get('b_user') ? <Component {...renderProps} /> : <Redirect to={{ pathname: '/backend', state: { from: renderProps.location } }} />
        }}
        />
    )
}
