import React from 'react'
import withRouter from 'react-router-dom/withRouter'

import SignUp from '~components/sign-up.jsx'
import SignIn from '~components/sign-in.jsx'


const Sign = props => {
    const backend = props.location.pathname.indexOf('/backend') === 0
    const signUpHtml = !backend ? <SignUp /> : ''
    const signInHtml = !backend ? <SignIn /> : ''
    return (
        <div>
            { signUpHtml }
            { signInHtml }
        </div>
    )
}
export default withRouter(Sign)
