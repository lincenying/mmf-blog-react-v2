import React from 'react'
import Link from 'react-router/lib/Link'

export default props => {
    const item = props.list
    return <li><Link to={`/article/${item.id}`}>{item.title}</Link></li>
}
