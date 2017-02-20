import React from 'react'

export default props => {
    return (
        <div className="card feed">
            <div className="feed-content">
                <div className="feed-desc-wrap">
                    <div className="feed-article-content markdown-body">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}
