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
        this.handleReply = this.handleReply.bind(this)
        this.handlePostComment = this.handlePostComment.bind(this)
    }
    handleReply() {
    }
    handleSearch() {

    }
    render() {
        const comments = this.props.comments.data
        const html = comments.map(item => {
            return (
                <div key={item.id} class="comment-item">
                    <a href="javascript:;" class="comment-author-avatar-link">
                        <img src="//ww2.sinaimg.cn/large/005uQRNCgw1f4ij3d8m05j301s01smwx.jpg" alt="" class="avatar-img" />
                    </a>
                    <div class="comment-content-wrap">
                        <span class="comment-author-wrap">
                            <a href="javascript:;" class="comment-author">{ item.username }</a>
                        </span>
                        <div class="comment-content" v-text="item.content" />
                        <div class="comment-footer">
                            <span class="comment-time" v-text="item.creat_date" />
                            <a onClick={this.handleReply} href="javascript:;" class="comment-action-item comment-reply">回复</a>
                        </div>
                    </div>
                </div>
            )
        })
        const hasNext = this.props.comments.hasNext ? <div v-if="comments.hasNext" class="load-more-wrap"> <a onClick="loadcomment()" href="javascript:;" class="comments-load-more">加载更多</a> </div> : ''
        return (
            <div class="card">
                <div class="comments">
                    <div class="comment-post-wrap"> <img src="//ww2.sinaimg.cn/large/005uQRNCgw1f4ij3d8m05j301s01smwx.jpg" alt="" class="avatar-img" />
                        <div class="comment-post-input-wrap base-textarea-wrap">
                            <textarea id="content" class="textarea-input base-input" cols="30" rows="4" />
                        </div>
                        <div class="comment-post-actions clearfix">
                            <a onClick={this.handlePostComment} href="javascript:;" class="btn btn-blue">发表评论</a>
                        </div>
                    </div>
                    <div class="comment-items-wrap">
                        {html}
                    </div>
                    {hasNext}
                </div>
            </div>
        )
    }
}
