console.log((new Date()).toLocaleString() + ' 🌤 \n')

const array = ['apple', 'banana', 'grapes', 'mango', 'orange']
const _array = [123, 1, 1, 1, 2, 23, 1, [12, 3, 4, 5, 67, 7, 8, 8, [34, 4322, 56432, 432423, [324, 42, 23432, 6546, 78, 7657,]],
  [31, 5, 1, 45, 6, 7, 7, 234,],
  [45, 32, 45, 4342, 545, 23, 44424324, 54, 522,]
]]

function filterItem(query) {
  return array.filter((el) => {
    return el.toLowerCase().indexOf(query.toLowerCase()) > -1
  })
}

const SCHEME_OBJECT_KEY = ["ENT_SERVICE_LIST", "RECOMMOND_SERVICE_LIST", "CONSULTANT_SERVICE_LIST", "DETAIL_PAGE_ADBSTRACT_FIELD", "DETAIL_PAGE_OPERATE_AREA", "DETAIL_PAGE_DETAIL_AREA", "INVESTOR_RECOMMOND_SERVICE_LIST", "INVESTOR_DETAIL_PAGE_ABSTRACT_FIELD", "INVESTOR_DETAIL_PAGE_OPERATE_AREA", "INVESTOR_DETAIL_PAGE_DETAIL_AREA"]

function flatten(arr) {
  while (arr.some(item => Array.isArray(item))) { // 只要有一个元素有数组，那么循环继续
    arr = [].concat(...arr)
  }
  return arr
}

let result = []
let fn = function (array) {
  for (let i = 0; i < array.length; i++) {
    let item = array[i]
    if (Array.isArray(item)) {
      fn(item)
    } else {
      result.push(item)
    }
  }
}

// console.log('➡️ ', [...new Set(flatten(_array))].sort((a, b) => {
// return a - b
// }))
// console.log('➡️ ', filterItem('ap'))


Array.prototype.distinct = function () {
  const map = {}
  const result = []
  for (let n of this) {
    if (!(n in map)) {
      map[n] = 1
      result.push(n)
    }

    return result
  }
}


// console.log('➡️ ',(flatten(_array)).distinct())
// console.log('➡️ ', Math.max(...[...new Set(flatten(_array))]))

function sum(arr) {
  // console.log('== arr >>>', arr)
  if (!arr) return

  arr.reduce((prve, curr) => {
    return prve + curr
  }, 0)
}

function _sum(a, b) {
  // let args = Array.prototype.slice.call(arguments)
  // let args = Array.from(arguments)
  let args = [...arguments]
  console.log(args.reduce((sum, cur) => sum + cur))
}

let _fruit = array.find((item) => {
  return item === 'mango'
})

let _fruitIndex = array.findIndex((item) => {
  return item === 'banana'
})
console.log('_fruitIndex >>', _fruitIndex)
// _sum(3, 5)
// console.log('➡️ ', [{ count: 1 }, { count: 2 }, { count: 3 }].reduce((p, e) => p + (e.count), 0))

