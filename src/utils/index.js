import toastr from 'toastr'
toastr.options.positionClass = 'toast-top-center'

export const setMessage = config => {
    let content, type
    if (typeof config === 'string') {
        content = config
        type = 'error'
    } else {
        content = config.content
        type = config.type
    }
    toastr[type](content)
}

export const strlen = str => {
    let charCode = -1
    const len = str.length
    let realLength = 0
    for (let i = 0; i < len; i++) {
        charCode = str.charCodeAt(i)
        if (charCode >= 0 && charCode <= 128) realLength += 1
        else realLength += 2
    }
    return realLength
}
