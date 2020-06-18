function isObject (obj) {
  // return Object.prototype.toString.call(obj) === '[object Object]'
  return typeof obj === 'object' && obj != null
}

if (typeof Object.assign3 !== 'function') {
  Object.defineProperty(Object, 'assign3', {
    value: function (target) {
      if (target === null) {
        throw new TypeError('some error at here')
      }

      let to = Object(target)

      for (let i = 0; i < arguments.length; i++) {
        let nextSource = arguments[i]

        if (nextSource !== null) {
          for (let nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey]
            }
          }
        }
      }

      return to
    },
    writable: true,
    configurable: true
  })
}

function deepCopy (source) {
  if (!isObject(source)) return source

  let target = Array.isArray(source) ? [] : {}

  for (let nextKey in source) {
    if (Object.prototype.hasOwnProperty.call(source, nextKey)) {
      if (typeof source[nextKey] === 'object') {
        target[nextKey] = deepCopy(source[nextKey])
      } else {
        target[nextKey] = source[nextKey]
      }
    }
  }

  return target
}

let a = {
  name: 'advanced',
  age: 18
}
let b = {
  name: 'hankins',
  book: {
    title: 'You Don\'t Know JS',
    price: '45'
  },
  title: null,
  content: undefined,
  sym: Symbol('sym')
}
// let c = Object.assign3(a, b)
// console.log(c)

let d = deepCopy(b)

b.name = 'pan'
b.book.price = '80'

console.log('==== d >>>', d)

console.log('==== b >>>', b)
