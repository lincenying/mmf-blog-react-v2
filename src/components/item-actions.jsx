import React, {Component} from 'react'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'
import {propTypes} from '~decorators'

@immutableRenderDecorator
@propTypes({

})
export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.handleLike = this.handleLike.bind(this)
        this.handleShare = this.handleShare.bind(this)
    }
    handleLike() {
    }
    handleShare() {

    }
    render() {
        const item = this.props.payload
        return (
            <div className="actions-wrap">
                <a onClick={this.handleLike} href="javascript:;" className={item.like_status ? 'action-item active' : 'action-item'}><i className={item.like_status ? 'icon icon-action-voteup-active' : 'icon icon-action-voteup'} /><span className="text">{ item.like } 赞</span></a>
                <a href="javascript:;" className="action-item"><i className="icon icon-action-comment" /><span className="text">{ item.comment_count } 评论</span></a>
                <a href="javascript:;" className="action-item action-item-fav"><i className="icon icon-action-fav" /><span className="text">{ item.visit } 浏览</span></a>
                <a onClick={this.handleShare} href="javascript:;" className="action-item"><i className="icon icon-action-share" /><span className="text">分享</span></a>
            </div>
        )
    }
}
