import React from 'react'

const TopicsItemNone = props => {
    return (
        <div className="card feed">
            <div className="feed-content">
                <div className="feed-desc-wrap">
                    <div className="feed-article-content markdown-body">{props.children}</div>
                </div>
            </div>
        </div>
    )
}
export default TopicsItemNone
