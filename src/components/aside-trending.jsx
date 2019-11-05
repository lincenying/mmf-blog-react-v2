import React from 'react'
import { Link } from 'react-router-dom'

const AsideTrending = props => {
    const { payload } = props
    const html = payload.map((item, index) => {
        return (
            <div key={item._id} className="trending-item">
                <span className="trending-rank-num">{index + 1}</span>
                <Link to={`/article/${item._id}`} className="trending-title">
                    {item.title}
                </Link>
                <div className="trending-meta">
                    <div className="trending-meta-item">
                        <i className="icon icon-action-voteup" />
                        {item.like}
                    </div>
                    <div className="trending-meta-item">
                        <i className="icon icon-action-comment" />
                        {item.comment_count}
                    </div>
                </div>
            </div>
        )
    })
    return (
        <div className="card card-trending">
            <h2 className="card-title">热门文章</h2>
            <div className="card-content">{html}</div>
        </div>
    )
}
export default AsideTrending
