/**
 *
 * @param context
 * @returns {*}
 */
Function.prototype.mockCall = function (context) {
  context = context ? Object(context) : window
  context.fn = this

  let args = [...arguments].slice(1)
  let result = context.fn(...args)

  delete context.fn
  return result
}

/**
 *
 * @param context
 * @param arrays
 * @returns {*}
 */
Function.prototype.mockApply = function (context, arrays) {
  context = context ? Object(context) : window
  context.fn = this

  let result
  if (!arrays) {
    result = context.fn()
  } else {
    result = context.fn(...arrays)
  }

  delete context.fn
  return result
}

Function.prototype.mockBind = function (context) {
  context = context ? Object(context) : window

  let self = this
  const args = [...arguments].slice(1)

  return function () {
    let _args = args.concat([...arguments])

    return self.apply(context, _args)
  }
}
