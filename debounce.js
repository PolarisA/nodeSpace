/**
 * 防抖
 *
 * 当触发一个事件时，响应总是在n秒后才执行，如果在等待n秒的过程中，重新触发了该事件，
 * 则重新开始等n秒。直到等待n秒的过程中不再触发这个事件，才执行响应。
 */

/**
 * Version 1
 * @param func
 * @param wait
 * @returns {function(...[*]=)}
 */
function debounceV1 (func, wait) {
  let timeout

  return function () {
    clearTimeout(timeout)

    timeout = setTimeout(func, wait)
  }
}

/**
 * Version 2
 * 添加 this 指向
 * @param func
 * @param wait
 * @returns {function(...[*]=)}
 */
function debounceV2 (func, wait) {
  let timeout

  return function () {
    let context = this

    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(context)
    }, wait)
  }
}

/**
 * Version 3
 * 添加 this 指向 ，event 对象
 * @param func
 * @param wait
 * @returns {function(...[*]=)}
 */
function debounceV3 (func, wait) {
  let timeout

  return function () {
    let context = this
    let args = arguments

    clearTimeout(timeout)

    timeout = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}

/**
 * Version 4 变体I
 * 添加 立即执行
 * @param func
 * @param wait
 * @param immediate
 * @returns {function(...[*]=)}
 */
function debounceV4 (func, wait, immediate) {
  let timeout

  return function () {
    let context = this
    let args = arguments

    if (timeout) clearTimeout(timeout)

    if (immediate) {
      let canRun = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)

      if (canRun) func.apply(context, args)
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args)
      }, wait)
    }
  }
}

/**
 * Version 5 变体II
 * 添加 当回调函数有返回值时
 * @param func
 * @param wait
 * @param immediate
 * @returns {function(): *}
 */
function debounceV5 (func, wait, immediate) {
  let timeout
  let result

  return function () {
    let context = this
    let args = arguments

    if (timeout) clearTimeout(timeout)

    if (immediate) {
      let canRun = !timeout

      timeout = setTimeout(() => {
        timeout = null
      }, wait)

      if (canRun) result = func.apply(context, args)
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args)
      }, wait)
    }

    return result
  }
}

