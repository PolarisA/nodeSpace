/**
 * bind 特性
 * 1. 可以指定this
 * 2. 返回一个函数
 * 3. 可以传入参数
 * 4. 柯里化
 */

/**
 *
 * @param obj
 * @returns {function(*): boolean|boolean}
 */
const isComplexDataType = obj => type => (typeof obj === 'object' || typeof obj === 'function') && obj !== null

/**
 * 模拟实现 bind
 * @param context
 */
Function.prototype.selfBindV1 = function (context) {
  if (typeof this !== 'function') {
    throw new Error('Function.prototype.bind - what is trying to be bound is not callable')
  }

  let self = this
  let args = Array.prototype.slice.call(arguments, 1)

  let fNOP = function () {

  }

  let bindFun = function () {
    let bindArgs = Array.prototype.slice.call(arguments)

    return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs))
  }

  fNOP.prototype = this.prototype
  bindFun.prototype = new fNOP()

  return bindFun
}

const selfBind2 = function (bindTarget, ...args1) {
  if (typeof this !== 'function') {
    throw new Error('Function.prototype.bind error')
  }

  const originFunc = this
  const boundFunc = function (...args2) {
    if (new.target) {
      let res = originFunc.call(this, ...args1, ...args2)
      if (isComplexDataType(res)) return res
      return this
    } else {
      originFunc.call(bindTarget, ...args1, ...args2)
    }
  }

  if (originFunc.prototype) {
    boundFunc.prototype = originFunc.prototype
  }

  const desc = Object.getOwnPropertyDescriptors(originFunc)
  Object.defineProperties(boundFunc(), {
    length: desc.length,
    name: Object.assign(desc.name, {
      value: `bound ${desc.name.value}`
    })
  })

  return boundFunc
}
