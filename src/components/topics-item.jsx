import React from 'react'
import Link from 'react-router/lib/Link'
import actions from './item-actions'

export default props => {
    const item = props.item
    return (
        <div class="card feed">
            <div class="feed-content"> <span class="feed-time">{ item.creat_date }</span><span class="feed-source">来自分类 <Link to={'/category/' + item.category} class="feed-minor-link">{item.category_name}</Link></span>
                <div class="feed-main-link-wrap"><Link to={'/article/' + item._id} class="feed-main-link">{item.title}</Link></div>
                <div class="feed-desc-wrap">
                    <div class="feed-article-content markdown-body">{item.content}</div>
                </div>
            </div>
            <actions item={item} />
        </div>
    )
}
