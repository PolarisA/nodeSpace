function add () {
  let res = [...arguments].reduce((a, b) => {
    return a + b
  }, 0)

  let temp = function () {
    if (arguments.length) {
      res += [...arguments].reduce((a, b) => {
        return a + b
      }, 0)
      return temp
    } else {
      return res
    }
  }

  temp.toString = function () {
    return res
  }

  return temp
}

console.log(' a 1 >>>', add(1))
console.log(' a 1 2 >>>', add(1)(2))
console.log(' a 1 2 3>>>', add(1)(2)(3))
