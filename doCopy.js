function isObject (obj) {
  return typeof obj === 'object' && obj !== null
}

if (typeof Object.assign2 !== 'function') {
  Object.defineProperty(Object, 'assign2', {
    value: function (target) {
      'use static'
      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object')
      }

      var to = Object(target)

      for (var i = 0; i < arguments.length; i++) {
        var nextSource = arguments[i]

        if (nextSource != null) {
          for (var nextKey in nextSource) {
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

function cloneShallow (source, hash = new WeakMap()) {
  if (!isObject(source)) return source
  if (hash.has(source)) {
    return hash.get(source)
  }

  var target = Array.isArray(source) ? [] : {}
  hash.set(source, target)

  let symKeys = Object.getOwnPropertySymbols(source)
  if (symKeys.length) {
    symKeys.forEach(symKey => {
      if (isObject(source[symKey])) {
        target[symKey] = cloneShallow(source[symKey], hash)
      } else {
        target[symKey] = source[symKey]
      }
    })
  }

  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (typeof target[key] === 'object') {
        target[key] = cloneShallow(source[key], hash)
      } else {
        target[key] = source[key]
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
  name: 'muyiy',
  book: {
    title: 'You Don\'t Know JS',
    price: '45'
  }
}
let c = Object.assign2(a, b)
console.log(c)
