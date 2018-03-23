import React from 'react'

const Navigation = () => {
    return (
        <nav className="global-nav">
            <div className="wrap">
                <div className="left-part">
                    <a href="/" className="logo-link">
                        <i className="icon icon-nav-logo" />
                        <span className="hidden">M.M.F 小屋</span>
                    </a>
                    <div className="main-nav">
                        <a href="/" className="nav-link">
                            <i className="icon icon-nav-home" />
                            <span className="text">首页</span>
                        </a>
                        <a href="/trending/visit" className="nav-link">
                            <i className="icon icon-nav-explore" />
                            <span className="text">热门</span>
                        </a>
                        <a href="/about" className="nav-link">
                            <i className="icon icon-nav-features" />
                            <span className="text">关于</span>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Navigation
