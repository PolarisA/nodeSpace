function throttle(func, wait) {
    let context;
    let args;
    let previous = 0;

    return function() {
        let now = +new Date()
        context = this
        args = arguments

        if (now - previous > wait) {
            func.apply(context, args)
            previous = now
        }
    }
}

function throttleV2(func, wait) {
    let previous = 0;
    let timeout

    return function() {
        context = this
        args = arguments

        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null
                func.apply(context,args)
            },wait)
        }
    }
}