const base = [9, 8, 7, 6, 5, 4, 3, 2, 1]

Array.prototype.reduceV2 = function (callBackFn, initialValue) {
  if (this === null) {
    throw new TypeError('cannot read prototype reduce of Array')
  }

  if (typeof callBackFn !== 'function') {
    throw new TypeError(callBackFn + 'is not a function')
  }

  let O = Object(this)

  let len = O.length >>> 0

  let k = 0

  let accumulator

  if (initialValue) {
    accumulator = initialValue
  } else {
    if (len === 0) {
      throw new TypeError('Reduce of empty array with no initial value')
    }

    let kPresent = false
    while (!kPresent && (k in O)) {
      kPresent = k in O
      if (kPresent) {
        accumulator = O[k]
      }
      k++
    }
  }

  while (k < len) {
    if (k in O) {
      let kValue = O[k]

      accumulator = callBackFn.call(undefined, accumulator, kValue, k, O)
    }
    k++
  }

  return accumulator
}

let _mock = base.reduceV2((accumulator, currentValue) => accumulator + currentValue, 5)

console.log('==== _mock >>>>', _mock)
