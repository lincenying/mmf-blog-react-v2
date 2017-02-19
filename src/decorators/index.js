export function propTypes(param) {
    return function(_class) {
        _class.propTypes = Object.assign({}, _class.propTypes || {}, param)
        return _class
    }
}
export function contextTypes(param) {
    return function(_class) {
        _class.contextTypes = Object.assign({}, _class.contextTypes || {}, param)
        return _class
    }
}
