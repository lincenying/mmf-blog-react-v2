import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import DevTools from '~devtools'
import Toastr from '~components/global/toastr.jsx'
import Navigation from '~components/navigation.jsx'
import SignUp from '~components/sign-up.jsx'
import SignIn from '~components/sign-in.jsx'

import "assets/css/hljs/googlecode.css"
import "assets/css/style.css"
import 'nprogress/nprogress.css'
import 'toastr/build/toastr.min.css'

export default props => {
    const backend = props.route.name !== "index"
    const signUpHtml = backend ? <SignUp /> : ''
    const signInHtml = backend ? <SignIn /> : ''
    return (
        <div id="app" className="g-doc">
            <Navigation backend={backend} />
            <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                {React.cloneElement(props.children, {
                    key: props.location.pathname
                })}
            </ReactCSSTransitionGroup>
            {signUpHtml}
            {signInHtml}
            <DevTools />
            <Toastr />
        </div>
    )
}
