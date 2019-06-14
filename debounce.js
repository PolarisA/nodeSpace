function debounce(func, wait, immediate) {
    let timeout
    let result

    return function() {
        let context = this
        let args = arguments

        if (timeout) clearTimeout(timeout)
        if (immediate) {
            let callNow = !timeout
            timeout = setTimeout(() => {
                timeout = null
            }, wait)
            if (callNow) result = func.apply(context, args)
        } else {
            timeout = setTimeout(() => {
                func.apply(context, args)
            }, wait)
        }
        return result
    }
}