/**
 * 当持续触发一个事件时，每隔一段儿时间，才响应一次。
 * 根据首次是否执行和结束后是否执行，效果不同，实现的方式也有所不同
 * 主流的实现方式可以分为：
 * 1.使用时间戳
 *  - 当触发事件的时候，取当前的时间戳，然后减去之前的时间戳（默认初始的时间戳为0），如果大于设定的时间周期，
 *  则立即执行响应函数，并更新时间戳为当前时间。如果小于设定的时间周期，则不执行。
 * 2.设置定时器
 *  - 当触发事件的时候，设定一个定时器，再触发事件的时候，判断定时器是否存在，如果存在，则不执行。
 *  直到定时器内的响应函数执行完成，清除定时器，再触发事件的时候，开始重新设定这个定时器。
 * @param func
 * @param wait
 * @returns {function(...[*]=)}
 */

/**
 * Version 1
 * @param func
 * @param wait
 * @returns {function(...[*]=)}
 */
// function throttle (func, wait) {
//   let previous = 0
//   return function () {
//     let now = +new Date()
//
//     let context = this
//     let args = arguments
//
//     if (now - previous > wait) {
//       func.apply(context, args)
//       previous = now
//     }
//   }
// }

/**
 * Version 2
 * @param func
 * @param wait
 * @returns {function(...[*]=)}
 */
function throttle (func, wait) {
  let timeout = null

  return function () {
    let context = this
    let args = arguments

    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        func.apply(context, args) // 等待wait秒之后开始执行
      }, wait)

      // func.apply(context, args) //立即执行 等待wait秒之后继续执行
    }
  }

}
