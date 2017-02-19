import React from 'react'

export default props => {
    const {title, classes} = props
    return (
        <div class="settings-section">
            <div class="settings-item with-input">
                <h4 class="settings-title">{ title }</h4>
                <div class="settings-item-content" className={classes}>
                    <div class="settings-input-wrap">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}
