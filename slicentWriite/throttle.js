// function throttle (func, writ) {
//   let perv = 0
//
//   return function () {
//     let context = this
//     let args = arguments
//
//     const now = +new Date()
//
//     if (now - perv > writ) {
//       func.apply(context, args)
//       perv = now
//     }
//   }
// }

function throttle (func, writ) {
  let timeout = null

  return function () {
    let context = this
    let args = arguments

    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        func.apply(context, args)
      }, writ)
    }
  }
}
