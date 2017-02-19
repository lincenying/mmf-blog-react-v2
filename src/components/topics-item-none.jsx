import React from 'react'

export default props => {
    return (
        <div class="card feed">
            <div class="feed-content">
                <div class="feed-desc-wrap">
                    <div class="feed-article-content markdown-body">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}
