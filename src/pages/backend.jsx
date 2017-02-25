import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import DevTools from '~devtools'
import Navigation from '~components/navigation.jsx'
import BackendMenu from '~components/backend-menu.jsx'

import "assets/css/hljs/googlecode.css"
import "assets/css/style.css"
import 'nprogress/nprogress.css'
import 'toastr/build/toastr.min.css'

const Backend = props => {
    const backend = props.route.name !== "index"
    const isLogin = props.location.pathname !== '/backend'
    const backendMenu = isLogin ? <BackendMenu /> : ''
    return (
        <div id="app" className="g-doc">
            <Navigation backend={backend} />
            <div className="main wrap clearfix">
                <div className="main-left">
                    <div className="home-feeds cards-wrap">
                        <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                            {React.cloneElement(props.children, {
                                key: props.location.pathname
                            })}
                        </ReactCSSTransitionGroup>
                    </div>
                </div>
                {backendMenu}
            </div>
            <DevTools />
        </div>
    )
}
export default Backend
