function debounce (func, writ) {
  let timeout = null

  return function () {
    let context = this
    let args = arguments

    clearTimeout(timeout)

    timeout = setTimeout(() => {
      func.apply(context, args)
    }, writ)
  }
}
