import React, {Component} from 'react'
import {connect} from 'react-redux'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'
import {propTypes} from '~decorators'

function mapDispatchToProps(dispatch) {
    return { dispatch }
}

@connect({}, mapDispatchToProps)
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
        const item = this.props.item
        return (
            <div class="actions-wrap">
                <a onClick={this.handleLike} href="javascript:;" class={item.like_status ? 'action-item active' : 'action-item'}><i class={item.like_status ? 'icon icon-action-voteup-active' : 'icon icon-action-voteup'} /><span class="text">{ item.like } 赞</span></a>
                <a href="javascript:;" class="action-item"><i class="icon icon-action-comment" /><span class="text">{ item.comment_count } 评论</span></a>
                <a href="javascript:;" class="action-item action-item-fav"><i class="icon icon-action-fav" /><span class="text">{ item.visit } 浏览</span></a>
                <a onClick={this.handleShare} href="javascript:;" class="action-item"><i class="icon icon-action-share" /><span class="text">分享</span></a>
            </div>
        )
    }
}
