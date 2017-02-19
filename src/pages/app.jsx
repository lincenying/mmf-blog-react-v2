import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import DevTools from '~devtools'
import Toastr from '~components/global/toastr.jsx'
import Navigation from '~components/navigation.jsx'

import 'nprogress/nprogress.css'
import 'toastr/build/toastr.min.css'

export default props => {
    const backend = props.location
    const signUp = backend ? <signUp show="" /> : ''
    const signIn = backend ? <signIn show="" /> : ''
    return (
        <div id="app" class="g-doc">
            <Navigation backend={backend} />
            <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                {React.cloneElement(props.children, {
                    key: props.location.pathname
                })}
            </ReactCSSTransitionGroup>
            {signUp}
            {signIn}
            <DevTools />
            <Toastr />
        </div>
    )
}
