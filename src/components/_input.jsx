import React from 'react'

const AInput = props => {
    const { title, classes } = props
    return (
        <div className="settings-section">
            <div className="settings-item with-input">
                <h4 className="settings-title">{title}</h4>
                <div className={'settings-item-content ' + classes}>
                    <div className="settings-input-wrap">{props.children}</div>
                </div>
            </div>
        </div>
    )
}
export default AInput
