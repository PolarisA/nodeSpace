/**
 * 判断对象的数据类型
 *
 * @param type
 * @returns {function(*): boolean}
 */
const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target)

/**
 *
 * @param obj
 * @returns {function(*=): boolean|boolean}
 */
const isComplexDataType = obj => type => (typeof type === 'object' || typeof type === 'function') && type !== null

/**
 * 循环实现 map
 * @param fn
 * @param context
 * @returns {any[]}
 */
const selfMap = function (fn, context) {
  let arr = Array.prototype.slice.call(this)
  let _selfMap = Array()

  for (let i = 0; i < arr.length; i++) {
    if (!arr.hasOwnProperty(i)) {
      continue
    }

    _selfMap[i] = fn.call(context, arr[i], i, this)
  }

  return _selfMap
}

/**
 * reduce 实现 map
 * @param fn
 * @param context
 * @returns {any[]}
 */
const selfMapV2 = function (fn, context) {
  let arr = Array.prototype.slice.call(this)

  return arr.reduce((per, curr, index) => {
    return [...per, fn.call(context, curr, index, this)]
  }, [])
}

/**
 * 循环实现 filter
 * @param fn
 * @param context
 * @returns {[]}
 */
const selfFilter = function (fn, context) {
  let arr = Array.prototype.slice.call(this)
  let _selfFilter = []

  for (let i = 0; i < arr.length; i++) {
    if (!arr.hasOwnProperty(i)) {
      continue
    }

    fn.call(context, arr[i], i, this) && _selfFilter.push(arr[i])
  }

  return _selfFilter
}

/**
 * reduce实现filter
 * @param fn
 * @param context
 * @returns {*}
 */
const selfFilterV2 = function (fn, context) {
  return this.reduce((per, curr, index) => {
    return fn.call(context, curr, index, this) ? [...per, curr] : [...per]
  }, [])
}

/**
 * 循环实现 some
 * @param fn
 * @param context
 * @returns {boolean}
 */
const selfSome = function (fn, context) {
  let arr = Array.prototype.slice.call(this)

  if (!array.length) {
    return false
  }
  for (let i = 0; i < arr.length; i++) {
    if (!arr.hasOwnProperty(i)) {
      continue
    }

    let res = fn.call(context, arr[i], i, this)
    if (res) {
      return true
    }
  }
  return false
}

/**
 * 循环实现 reduce
 * @param fn
 * @param initialValue
 * @returns {*}
 */
Array.prototype.selfReduce = function (fn, initialValue) {
  let arr = Array.prototype.slice.call(this)
  let res
  let startIndex

  if (initialValue === undefined) {
    for (let i = 0; i < arr.length; i++) {
      if (!arr.hasOwnProperty(i)) {
        continue
      }

      startIndex = i
      res = arr[i]
      break
    }
  } else {
    res = initialValue
  }

  for (let i = 0; i < arr.length; i++) {
    if (!arr.hasOwnProperty(i)) {
      continue
    }

    res = fn.call(null, res, arr[i], i, this)
  }
  return res
}

/**
 * reduce 实现flat方法
 * @param deep
 * @returns {unknown[]}
 */
const selfFlat = function (deep = 1) {
  let arr = Array.prototype.slice.call(this)

  if (deep === 0) return arr
  for (let i = 0; i < arr.length; i++) {
    arr.reduce((pre, curr) => {
      if (Array.isArray(curr)) {
        return [...pre, ...selfFlat(curr.length - 1)]
      } else {
        return [...pre, curr]
      }
    }, [])
  }
}

/**
 * 函数柯里化
 * @param fn
 * @returns {generator|*}
 */
function curry (fn) {
  if (fn.length < 1) return fn

  const generator = (...args) => {
    if (fn.length === args.length) {
      return fn(...args)
    } else {
      return (...args2) => {
        return fn(...args, ...args2)
      }
    }
  }
  return generator
}

/**
 * 偏函数
 * @param fn
 * @param args
 * @returns {function(...[*]): *}
 */
const partialFunc = (fn, ...args) => {
  let placeholderNum = 0

  return (...args2) => {
    args2.forEach(arg => {
      let index = args.findIndex(item => item === '_')

      if (index < 0) return

      args[index] = arg
      placeholderNum++
    })

    if (placeholderNum < args2.length) {
      args2 = args2.slice(placeholderNum, args2.length)
    }
    return fn.apply(this, [...args, ...args2])
  }
}

/**
 *
 * @param n
 * @returns {number|*}
 */
let fibonacci = (n) => {
  if (n < 1) throw new Error('n is error')
  if (n === 1 || n === 2) return 1

  return fibonacci(n - 1) + fibonacci(n - 2)
}

/**
 * 记忆函数
 * @param fn
 * @returns {function(*=): *}
 */
const memory = function (fn) {
  let obj = {}

  return function (n) {
    if (obj[n] === undefined) {
      obj[n] = fn(n)
    }

    return obj[n]
  }
}

/**
 * 斐波那契数列优化
 * @type {function(*=): *}
 */
fibonacci = memory(fibonacci)

/**
 * 斐波那契数列优化（降低空间复杂度）
 * @param n
 * @returns {number}
 */
function fibonacci_dp (n) {
  let res = 1
  if (n === 1 || n === 2) return res

  n = n - 2
  let cur = 1
  let pre = 1
  while (n) {
    res = cur + pre
    pre = cur
    cur = res
    n--
  }
  return res
}

/**
 * 手动实现
 * @param context
 * @returns {*}
 */
const selfCall = function (context) {
  let func = this
  context || (context = window)

  if (typeof func !== 'function') {
    throw new Error('this is not function')
  }

  let caller = Symbol('caller')
  context[caller] = func
  let res = context[caller](...arguments)
  delete context[caller]
  return res
}

/**
 * 函数防抖
 * @param func
 * @param time
 * @param options
 * @returns {_debounce}
 */
const debounce = function (
  func,
  time = 17,
  options = { leading: true, context: null }) {

  let timer
  const _debounce = function (...args) {
    if (timer) {
      clearTimeout(timer)
    }

    if (options.leading && !timer) {
      timer = setTimeout(null, time)
      func.apply(options.context, args)
    } else {
      timer = setTimeout(() => {
        func.apply(options.context, args)
        timer = null
      }, time)
    }
  }

  _debounce.cancel = function () {
    clearTimeout(timer)
    timer = null
  }

  return _debounce
}

/**
 * 函数节流
 * @param func
 * @param time
 * @param options
 * @returns {_throttle}
 */
const throttle = function (
  func,
  time = 17,
  options = { leading: true, trailing: false, context: null }) {
  let previous = +new Date(0)
  let timer

  const _throttle = function (...args) {
    let _now = +new Date()

    if (!options.leading) {
      if (timer) return

      timer = setTimeout(() => {
        timer = null
        func.apply(options.context, args)
      }, time)
    } else if (_now - previous > time) {
      func.apply(options.context, args)
      previous = _now
    } else if (options.trailing) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(options.context, args)
      }, time)
    }
  }

  _throttle.cancel = function () {
    previous = 0
    clearTimeout(timer)
    timer = null
  }

  return _throttle
}

/**
 * 手动实现 new
 * @param fn
 * @param arg
 * @returns {*}
 */
const selfNew = function (fn, ...arg) {
  let instance = Object.create(fn.prototype)

  let res = fn.apply(instance, arg)
  return isComplexDataType(res) ? res : instance
}

/**
 * 手动实现 instanceOf
 * @param left
 * @param right
 * @returns {boolean}
 */
const selfInstanceOf = function (left, right) {
  let proto = Object.getPrototypeOf(left)

  while (true) {
    if (proto === null) {
      return false
    }

    if (proto === right.prototype) {
      return true
    }
    proto = Object.getPrototypeOf(proto)
  }
}
