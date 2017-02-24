import React, {Component} from 'react'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'
import {propTypes} from '~decorators'

@immutableRenderDecorator
@propTypes({

})
export default class FrontendComment extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.handleReply = this.handleReply.bind(this)
        this.handlePostComment = this.handlePostComment.bind(this)
    }
    handleReply() {
    }
    handlePostComment() {

    }
    render() {
        const comments = []
        const html = comments.map(item => {
            return (
                <div key={item.id} className="comment-item">
                    <a href="javascript:;" className="comment-author-avatar-link">
                        <img src="//ww2.sinaimg.cn/large/005uQRNCgw1f4ij3d8m05j301s01smwx.jpg" alt="" className="avatar-img" />
                    </a>
                    <div className="comment-content-wrap">
                        <span className="comment-author-wrap">
                            <a href="javascript:;" className="comment-author">{ item.username }</a>
                        </span>
                        <div className="comment-content" v-text="item.content" />
                        <div className="comment-footer">
                            <span className="comment-time" v-text="item.creat_date" />
                            <a onClick={this.handleReply} href="javascript:;" className="comment-action-item comment-reply">回复</a>
                        </div>
                    </div>
                </div>
            )
        })
        const hasNext = this.props.comments ? <div className="load-more-wrap"> <a onClick="loadcomment()" href="javascript:;" className="comments-load-more">加载更多</a> </div> : ''
        return (
            <div className="card">
                <div className="comments">
                    <div className="comment-post-wrap"> <img src="//ww2.sinaimg.cn/large/005uQRNCgw1f4ij3d8m05j301s01smwx.jpg" alt="" className="avatar-img" />
                        <div className="comment-post-input-wrap base-textarea-wrap">
                            <textarea id="content" className="textarea-input base-input" cols="30" rows="4" />
                        </div>
                        <div className="comment-post-actions clearfix">
                            <a onClick={this.handlePostComment} href="javascript:;" className="btn btn-blue">发表评论</a>
                        </div>
                    </div>
                    <div className="comment-items-wrap">
                        {html}
                    </div>
                    {hasNext}
                </div>
            </div>
        )
    }
}
