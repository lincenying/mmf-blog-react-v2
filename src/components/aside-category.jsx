import React from 'react'
import Link from 'react-router/lib/Link'

export default props => {
    const { category } = props
    const html = category.map(item => {
        return (
            <Link key={item._id} to={`/category/${item._id}`} class="topic-item clearfix"><span class="avatar-link"><img src="/static/images/topic-1.png" class="avatar-image" /></span>
                <h3 class="topic-title">{ item.cate_name }</h3>
                <p class="topic-meta">{ item.cate_num || 0 } 篇文章</p><i class="icon icon-arrow-right" />
            </Link>
        )
    })
    return (
        <div class="card card-topics">
            {html}
        </div>
    )
}
