function flatten(array) {
    let result = []
    for (let i = 0, len = array.length; i < len; i++) {
        let value = array[i]
        if (Array.isArray(value)) {
            result = result.concat(flatten(value))
        } else {
            result.push(value)
        }
    };
    return result
}