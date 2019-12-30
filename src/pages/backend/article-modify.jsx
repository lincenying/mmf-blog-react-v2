import React, { Component } from 'react'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import api from '~/api'
import AInput from '~/components/_input.jsx'
import { propTypes } from '~/decorators'
import { getCategoryList } from '~/store/reducers/global/category'
import { setMessage } from '~/utils'

@connect(
    state => ({
        category: state.category.toJS().lists
    }),
    dispatch => ({ ...bindActionCreators({ getCategoryList }, dispatch), dispatch })
)
@immutableRenderDecorator
@propTypes({})
class ArticleModify extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            category: '',
            category_name: '',
            category_old: '',
            content: ''
        }
        this.handleModify = this.handleModify.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.getArticleData = this.getArticleData.bind(this)
        this.getArticleData()
    }
    async componentDidMount() {
        this.props.getCategoryList()
    }
    async getArticleData() {
        const { code, data } = await api.get('backend/article/item', { id: this.props.match.params.id })
        if (code === 200) {
            this.setState({
                title: data.title,
                category: data.category,
                category_name: data.category_name,
                category_old: data.category,
                content: data.content
            })
            // eslint-disable-next-line
            window.postEditor = editormd("post-content", {
                width: '100%',
                height: 500,
                markdown: data.content,
                placeholder: '请输入内容...',
                path: '/static/editor.md/lib/',
                toolbarIcons() {
                    return [
                        'bold',
                        'italic',
                        'quote',
                        '|',
                        'list-ul',
                        'list-ol',
                        'hr',
                        '|',
                        'link',
                        'reference-link',
                        'image',
                        'code',
                        'table',
                        '|',
                        'watch',
                        'preview',
                        'fullscreen'
                    ]
                },
                watch: false,
                saveHTMLToTextarea: true
            })
        }
    }
    handleModify() {
        // eslint-disable-next-line
        const content = postEditor.getMarkdown()
        if (!this.state.title || !this.state.category || !content) {
            setMessage('请将表单填写完整!')
            return
        }
        this.setState({ content }, async () => {
            const { code, data, message } = await api.post('backend/article/modify', {
                ...this.state,
                id: this.props.match.params.id
            })
            if (code === 200) {
                setMessage({ type: 'success', content: message })
                this.props.dispatch({ type: 'updateArticleItem', data })
                this.props.history.push('/backend/article/list')
            }
        })
    }
    handleChange(e) {
        const obj = e.target
        const category_name = obj.options[obj.selectedIndex].text
        this.setState({ category: obj.value, category_name })
    }
    render() {
        const select = this.props.category.map(item => {
            return (
                <option key={item._id} value={item._id}>
                    {item.cate_name}
                </option>
            )
        })
        return (
            <div className="settings-main card">
                <div className="settings-main-content">
                    <AInput title="标题">
                        <input
                            value={this.state.title}
                            onChange={e => this.setState({ title: e.target.value })}
                            type="text"
                            placeholder="标题"
                            className="base-input"
                            name="title"
                        />
                        <span className="input-info error">请输入标题</span>
                    </AInput>
                    <AInput title="分类" classes={'select-item-wrap'}>
                        <i className="icon icon-arrow-down" />
                        <select value={this.state.category} onChange={this.handleChange} className="select-item" name="category">
                            <option value="">请选择分类</option>
                            {select}
                        </select>
                        <span className="input-info error">请输入分类</span>
                    </AInput>
                    <div className="settings-section">
                        <div id="post-content" className="settings-item-content">
                            <textarea id="editor" name="content" className="form-control hidden" data-autosave="editor-content" />
                        </div>
                    </div>
                </div>
                <div className="settings-footer">
                    <Link to="/backend/article/list" className="btn btn-blue">
                        返回
                    </Link>
                    <a onClick={this.handleModify} href={null} className="btn btn-yellow">
                        编辑文章
                    </a>
                </div>
            </div>
        )
    }
}
export default ArticleModify
