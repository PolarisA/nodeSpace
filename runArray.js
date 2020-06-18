// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> mock data >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const points = [
  { x: 10, y: 20 },
  { x: 20, y: 30 },
  { x: 30, y: 40 },
  { x: 40, y: 50 },
  { x: 50, y: 60 },
  { x: 60, y: 70 },
  { x: 70, y: 80 },
  { x: 80, y: 90 },
]

const arrayA = [1, 124, 34, 5, 23, 45, '45', 'a', 'aa', true, 1, '1', NaN, 124, 14, 5, NaN,
  'bb', 'README.md', 'a', 'A', { key: 'value' }, { key: 'value' }, Symbol('DD')]

const arrayB = [
  1,
  [1, 2, 2,
    [
      'hello',
      'world'
    ],
    3, '2', 2, '22', 3
  ],
  5, 6, 34, 23, 43, 34,
  ['a'],
  'a',
  { key: 'value' },
  [
    [2],
    [2, 3, 4, 'DD'],
    [2],
    [Symbol('AA')]
  ]
]

const arrayC = [123, 1, 1, 45, 2, 23, 18,
  [12, 3, 4, 5, 67, 7, 8, 8,
    [34, 4322, 56432, 432423,
      [324, 42, 23432, 6546, 78, 7657, 18]
    ],
    [31, 5, 1, 45, 6, 7, 7, 234, 35],
    [45, 32, 45, 4342, 545, 23, 44424324, 54, 522, 12]
  ]
]

const arrayD = ['apple', 'banana', 'grapes', 'mango', 'orange']

const arrayE = [
  { name: 'Alice', age: 14 },
  { name: 'Bob', age: 15 },
  { name: 'Pan', age: 16 },
  { name: 'Jone', age: 18, sex: '男' },
  { name: 'Pan', age: 16, },
  { name: 'Bob', age: 15 },
  { name: 'Bob', age: 16, sex: '男' },
]

const arrLikeA = {
  length: 3,
  0: 'foo',
  1: 'bar',
}

const arrLikeB = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<< mock data >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

/**
 * 数组降维操作
 * @param arr
 * @returns {string[]}
 */

/**
 *【非通用】
 * 1. 数组字符串化
 *  1.1 全部类型都转出字符串
 *  1.2 对于Object的无法处理
 *  1.3 Symbol不支持转字符串
 *  1.4 NAN 不支持
 */
const toOneLevel_1 = arr => {
  let _arr = arr += ''
  return _arr.split(',')
}

/**
 * 2. 递归拼合
 * Array.prototype.concat 连接各项内容
 * @param arr
 * @returns {*[]}
 */
const toOneLevel_2 = arr => [].concat(...arr.map(item => Array.isArray(item) ? toOneLevel_2(item) : item))

/**
 * 3. Array.prototype.flat
 *  3.1 Infinity最大深度展开
 * @param arr
 * @returns {any[]}
 */
const toOneLevel_3 = arr => {
  if (Array.isArray(arr)) {
    return arr.flat(Infinity)
  }
}

/**
 * 4. 循环实现 反无限嵌套多层嵌套数组
 *  4.1 弹出顶层元素
 *  4.2 判断是否是一个数组
 *   4.2.1 不是数组，压到res中
 *   4.2.2 是数组，将其展开（展开第一层，重新压倒原数组）
 *  4.3 移除弹出的元素
 *  4.4 当原数组中不再有元素 将res翻转 返回
 * @param arr
 * @returns {*[]}
 */
const toOneLevel_4 = arr => {
  const stack = [...arr]
  let res = []

  while (stack.length) {
    let next = stack.pop()

    if (Array.isArray(next)) {
      stack.push(...next)
    } else {
      res.push(next)
    }
  }

  return res.reverse()
}

/**
 * 5. Array.prototype.reduce 高阶函数 + concat + 递归的结合使用
 *  【方式2】的变体
 * @param arr
 * @returns {*}
 */
const toOneLevel_5 = arr => {
  return arr.reduce((acc, val) => Array.isArray(val)
    ? acc.concat(toOneLevel_5(val))
    : acc.concat(val)
    , [])
}

/**
 * 1. 双重循环 【使用let的话 会产生块级作用域 for循环外部无法判断】
 *  1.1 外层循环的值 与已存储的数组长度循环对比
 *  1.2.1 如果对比相等，跳出本轮循环
 *  1.2.2 如果不同则存储在新的数组中
 * @param arr
 * @returns {[]}
 */
function uniqueV1 (arr) {
  let res = []

  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < res.length; j++) {
      if (arr[i] === res[j]) {
        break
      }
    }

    if (j === res.length) {
      res.push(arr[i])
    }
  }

  return res
}

/**
 * 2. 循环数组 判断是否 indexOf === -1
 *  2.1 如果 === -1 压入新的数组中
 *  2.2 返回这个数组
 * @param arr
 * @returns {[]}
 */
function uniqueV2 (arr) {
  let res = []
  for (let i = 0; i < arr.length; i++) {
    let current = arr[i]

    if (res.indexOf(current) === -1) {
      res.push(current)
    }
  }
  return res
}

/**
 *【非通用】
 * 3. 先排序后去重
 *  3.1 对比先后两个数据是不是相等
 *  3.2 如果不是第一个 或者前后对比不相等的话 将其压入到存储的数组中
 *  3.3 当前的值存储到一个临时变量 以备下一次比对
 *  3.4 不能比较Object引用类型 Symbol等数据
 *  3.5 sort排序的限制使用
 * @param arr
 * @returns {[]}
 */
function uniqueV3 (arr) {
  let res = []
  let sortedArray = arr.concat().sort()
  let screen = ''

  for (let i = 0; i < sortedArray.length; i++) {
    if (!i || screen !== sortedArray[i]) {
      res.push(sortedArray[i])
    }

    screen = sortedArray[i]
  }

  return res
}

/**
 * 4. Array.prototype.filter 【ES6】
 *  4.1 filter 通过过滤 数组中的元素
 *  4.2 返回第一次出现以及其第一个出现在数组中的位置 生成新的数组
 * @param arr
 * @returns {*}
 */
function uniqueV4 (arr) {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index
  })
}

/**
 * 【非通用】
 * 5. Object 键值对方式
 *  5.1 将数组存到Object的key
 *  5.2 对象的值只能存储字符串 所以用typeOf item + item 加强这种结构 避免 1 和 '1'相同的问题
 *  5.3 Symbol 不支持
 * @param arr
 * @returns {*}
 */
function uniqueV5 (arr) {
  let obj = {}

  return arr.filter((item, index) => {
    return obj.hasOwnProperty(typeof item + `${item}`) ? false : (obj[typeof item + `${item}`] = true)
  })
}

/**
 * 6. Set数组去重 【ES6】
 *  6.1 对象不去重
 * @param arr
 * @returns {any[]}
 */
function uniqueV6 (arr) {
  // return Array.from(new Set(arr)) // Array.from 转化为数组
  return [...new Set(arr)] // 延展符
}

/**
 * 1. 基于 instanceOf
 *  1.1 通过原型链 __proto__ 一层层往上找
 *  如果和 constructor.prototype相等则返回true
 *
 *  ps: 对于手动改写 对象内 __proto__ 的类型，无法做到准确判断 「1-4方法都失效」
 *  let arr = {
 *    __proto__: Array.prototype
 *  }
 * @param arr
 * @returns {boolean}
 */
function isArrayV1 (arr) {
  return arr instanceof Array
}

/**
 * 2. 通过构造函数属性
 * @param arr
 * @returns {boolean}
 */
function isArrayV2 (arr) {
  return arr.constructor === Array
}

/**
 * 3. 基于Object.prototype.isPrototypeOf
 * @param arr
 * @returns {boolean}
 */
function isArrayV3 (arr) {
  return Array.prototype.isPrototypeOf(arr)
}

/**
 * 4. 基于 Object.getPrototypeOf
 * @param arr
 * @returns {boolean}
 */
function isArrayV4 (arr) {
  return Object.getPrototypeOf(arr) === Array.prototype
}

/**
 * 5. 基于 Object.prototype.toString
 * @param arr
 * @returns {boolean}
 */
function isArrayV5 (arr) {
  return Object.prototype.toString.apply(arr) === '[object Array]'
}

/**
 * 6. Array.prototype.isArray
 * @param arr
 * @returns {arg is any[]}
 */
function isArray (arr) {
  return Array.isArray(arr)
}

/**
 * 1. Array
 *  1.1 当参数为单个数字（n）的时候 其参数的含义为构建一个以该数字长度长的数组（empty * n）
 *  1.2 当参数为非单个数字（字符、多个数字等）的时候 其参数的含义为构建以其内容组成的数组
 *  Array('8.0') // ['8']
 *  Array(8.0) // [8 * empty]
 *  Array(8,3) // [8,3]
 */

/**
 * 2. Array.of() 【ES6新增】
 *  2.1 用于将参数依次转为数组中的一项，然后返回这个数组
 *      不管他是数字还是其他
 *  Array.of(8.0) // [8]
 *  Array.of(8.0,5) // [8,5]
 */

/**
 * 3. Array.from 【ES6新增】
 *  3.1 将一个含有迭代器的类数组对象（String，Set，Map，arguments 等），转为新数组（原值不改变）
 *  3.2 参数：
 *   a: 类数组对象（必选）
 *   b: 加工函数（回调函数），必须有返回值 （可选）
 *   c: 加工函数（回调函数）执行时的this作用域 （可选）
 *
 *   const arrLikeA = {
 *   length: 3,
 *   0: 'foo',
 *   1: 'bar',
 *   }
 *
 *   Array.from(arrLikeA, function (value, index) {
 *    return value
 *    }, arrLikeA)
 *
 *   // [ 'foo', 'bar', undefined ]
 *
 *   Array.from({ length: 10 }, (v, i) => i) // 生成 0-9的数组
 */

/**
 * Array 改变自身值的方法 9种
 * 【pop push reverse shift sort splice unshift copyWithin fill】
 * ps: 对于修改自身值的数组方法，日常开发中要特别注意，尽量避免在循环遍历中使用
 *
 * 1. pop()
 *  1.1 删除数组(或者类数组)中最后一个元素，并且返回这个元素，相当于栈顶弹出
 *  let array = ["cat", "dog", "cow", "chicken", "mouse"]
 *
 *  let item = array.pop() // mouse
 *  console.log(array) // ["cat", "dog", "cow", "chicken"]
 *
 *  2. push()
 *   2.1 添加一个或者多个元素到数组(或者类数组)的末尾，并且返回数组的新长度，相当于栈顶压入
 *   let array = ["cat", "dog", "cow", "chicken", "mouse"]
 *   let item = array.push('snake') // 6
 *   console.log(array) // ["cat", "dog", "cow", "chicken", "mouse", "snake"]
 *
 *  3. reverse()
 *   3.1 翻转数组中元素的位置
 *
 *  4. shift()
 *   4.1 删除数组中第一个元素，并返回这个元素
 *   let array = ["cat", "dog", "cow", "chicken", "mouse"]
 *   let item = array.shift() // cat
 *   console.log(array) // ["dog", "cow", "chicken", "mouse"]
 *
 *  5. sort()
 *   5.1 将数组中的元素按照各自转化为字符串的Unicode码位点顺序排序（A-z 0-9等等）
 *   let array = ["apple","Boy","Cat","dog"]
 *   console.log(array.sort()) // ["Boy", "Cat", "apple", "dog"]
 *
 *   let arrNum = [10,1,20,3,101]
 *   console.log(arrNum) //  [1, 10, 101, 20, 3]
 *
 *   5.2 回调函数对于排序的影响 (a,b)=> a-b || b-a
 *   5.3 chrome （V8引擎对于排序内容的不同进行的调整）
 *   5.4 不同浏览器厂商对于sort的算法不同
 *
 *  6. splice()
 *  使用新元素来替换旧元素来更新数组
 *  arr.splice(start,deleteCount[])
 *
 *  6.0
 *   a: start 表示从哪一位开始修改,如果超过了数组长度，则从数组末尾添加内容
 *   如果为负，则指定的索引位置为 length + start，相当于从末尾位置开始的第 -start位
 *   b: deleteCount 表示要删除的元素个数，若等于0 则不删除。
 *   这种情况下，至少应该添加一个元素，若大于start之后的总和，则start以及之后的元素将都被删除
 *
 *  let array = ['apple','boy']
 *
 *  eg1:
 *  let splices = array.splice(1,1)
 *  console.log(array) // ['apple']
 *  console.log(splices) // ['boy']
 *
 *  eg2:
 *  let splices = array.splice(2,1,'cat')
 *  console.log(array) // ['apple','boy','cat']
 *  console.log(splices) // [] 可见由于start超过数组长度,此时从数组末尾开始添加元素,并且原数组不会发生删除行为
 *
 *  eg3:
 *  let splices = array.splice(-2,1,'cat')
 *  console.log(array) // ['cat','boy']
 *  console.log(splices) // ['apple'] 可见当start为负值时,是从数组末尾开始的第-start位开始删除,删除一个元素,并且从此处插入了一个元素
 *
 *  eg4:
 *  let splices = array.splice(-3,1,'cat')
 *  console.log(array) // ['cat','boy']
 *  console.log(splices) // ['apple'] 可见即使-start超出数组长度,数组默认从首位开始删除
 *
 *  eg5:
 *  let splices = array.splice(0,3,'cat')
 *  console.log(array) // ['cat']
 *  console.log(splices) // ['apple','boy'] 可见当deleteCount大于数组start之后的元素总和时,start及之后的元素都将被删除
 *
 *  eg6:
 *  删除数组中指定的第一个元素
 *  @param arr
 *  @param val
 *  @returns {*[]}
 *  function delArrayVal (arr = [], val = '') {
 *    if (arr.includes(val)) {
 *      return arr.splice(arr.indexOf(val), 1)
 *    }
 *    return arr
 *  }
 *
 *  7. unshift()
 *  用于在数组的开始部分插入一个或多个元素，并返回数组新的长度
 *
 *  let array = ["red", "green", "blue"]
 *  let _unshift = array.unshift('yellow')
 *  console.log(array) //["yellow", "red", "green", "blue"]
 *  console.log(_unshift) // 4
 *
 *  8. copyWithin()
 *  用于数组内元素之间的替换，即替换元素和被替换元素均是数组内的元素
 *  arr.copyWithin(target,start,end=this.length) end可选
 *
 *  let array = [1,2,3,4,5]
 *  let array2 = array.copyWithin(0,3)
 *  console.log(array2) // [4,5,3,4,5]
 *  console.log(array2 === array) // true
 *
 *  let array3 = array.copyWithin(0,3,4)
 *  console.log(array3) // [4, 2, 3, 4, 5]
 *  console.log(array2 === array) // true
 *
 *  let array4 = array.copyWithin(0,-2,-1)
 *  console.log(array4) // [4, 2, 3, 4, 5]
 *  console.log(array2 === array) // true
 *
 *  ps: 对于正负的规律总结
 *  [x,y,z] = [x,y+(-this.length),z+(-this.length)]
 *
 *  9. fill()
 *  用于替换数组内元素，主要用于替换某个区间内的元素为某个值
 *  arr.fill(value,start,end=this.length) end可选
 *
 *  let array = [1,2,3,4,5]
 *  let _fill = array.fill(10,0,3)
 *
 *  console.log(_fill) // [10,10,10,4,5]
 *  console.log(array2 === array) // true
 */

/**
 * Array 9种不会改变自身值的方法
 * 【concat、join、slice、toString、toLocateString、indexOf、lastIndexOf、toSource、includes】
 *
 * 1. concat()
 *  1.1 将传入的数组或者元素与原数组进行合并，组成新的数组并返回
 *  1.2 若不传参数，那么将基于原数组浅拷贝一个新的数组（指向新的地址空间）
 *
 *  let array = [1,2,3]
 *  let _concat = array.concat(4,5,[6,7],[8,9,10])
 *  console.log(_concat) // [1,2,3,4,5,6,7,8,9,10]
 *  console.log(array) // [1,2,3]
 *
 *
 * 2. join()
 *  2.1 将数组以方法中的参数(默认为逗号)连接成一个字符串并返回
 *  let array = ['hello','world']
 *  let _join = array.join()
 *  console.log(_join) // 'hello,world'
 *
 *
 *  3. slice()
 *   3.1 将数组中的一部分元素浅拷贝到一个新的数组中并返回 (当原数组中的值发生改变时，拷贝到的数组中值也相应变化)
 *   3.2 arr.slice(start,end=this.length) //end可选
 *   3.3 当start为负 改变方向
 *
 *   let array = ["one", "two", "three","four", "five"]
 *   console.log(array.slice()) // ["one", "two", "three","four", "five"]
 *   console.log(array.slice(2,3)) // ['three']
 *
 *
 *  4. toString()
 *   4.1 将数组转化成字符串，默认每个元素按照','相连接
 *   4.2 当将数组与字符串做连接操作时，会自动调用toString()方法
 *
 *
 *  5. toLocaleString()
 *   5.1 将数组中的各个元素经过各种类型的toLocaleString方法后通过join()相连接
 *   5.2 各种的toLocaleString
 *    a: Object：Object.prototype.toLocaleString()
 *    b: Number：Number.prototype.toLocaleString()
 *    c: Date：Date.prototype.toLocaleString()
 *
 *  let array = [{name:'zz'}, 123, "abc", new Date()]
 *  console.log(array.toLocaleString()) // "[object Object],123,abc,2020/6/18 上午10:34:07"
 *
 *
 *  6. indexOf()
 *   6.1 用于查找数组中元素第一次出现时的索引，如果没有，则返回-1
 *   6.2 indexOf(element,formIndex=0) formIndex可选
 *    a: element 是目标值
 *    b: formIndex 是开始查找的位置，默认为0 如果超出数组长度则返回-1，如果<0 则从头开始查找
 *   6.3 使用严格相等（===）比较数组中的元素
 *
 *
 *  7. lastIndexOf()
 *   7.1 用于查找数组中元素最后一次出现时的索引，如果没有，则返回-1
 *   7.2 他是indexOf的逆向查找，即从后往前找
 *
 *
 *  8. includes() 【ES7】
 *   8.1 用于判断当前数组中是否包含参数中的指定值，返回boolean true||false
 *   8.2 arr.includes(element,fromIndex=0)
 *    a: element 是目标值
 *    b: formIndex 是开始查找的位置，默认为0 如果超出数组长度则返回-1，如果<0 则从头开始查找
 *   8.3 includes 与 indexOf的区别 : includes 能够发现NaN
 *
 *
 *  9. toSource() 【非标准】
 *   9.1 返回数组的源码
 */

/**
 * Array 12种遍历方法，不会改变自身值
 * 【forEach、every、some、filter、map、reduce、reduceRight、entries、find、findIndex、keys、values】
 */

/**
 * 1. forEach()
 * 循环将数组的每个元素执行回调函数
 *  1.1 arr.forEach(fn,thisArg)
 *   a: fn表示在数组每一项上执行的函数，接收三个参数
 *    1. value 当前正在被处理的数组元素值
 *    2. index 当前元素的索引
 *    3. 数组本身
 * @param array
 * @returns {*}
 */
function doForEach (array) {
  return array.forEach((item, index, array) => {
    console.log(item)
    console.log(index)
    console.log(array)
  })
}

/**
 * 2. every()
 *  2.1 循环将数组中的每一个元素进行条件比较，并且将比较结果进行 && 运算
 *  如果有一个为false，则结果为false
 *
 * @param array
 * @returns {boolean}
 */
function doEvery (array) {
  return array.every(item => item > 100)
}

/**
 * 3. some()
 *  3.1 循环将数组中的每一个元素进行条件比较，并且将比较结果进行 || 运算
 *  如果有一个为true，true
 *
 * @param array
 * @returns {boolean}
 */
function doSome (array) {
  return array.some(item => item > 100)
}

/**
 * 4. filter()
 *  4.1 循环将数组中的每一个元素进行条件测试，并返回所有通过测试的元素组成的新数组
 *  即过滤条件符合的元素到新数组并返回
 * @param array
 * @returns {*}
 */
function doFilter (array) {
  return array.filter(item => item % 2 === 0)
}

/**
 * 5. map()
 *  5.1 循环将数组的每个元素执行回调函数,同forEach
 * @param array
 * @returns {*}
 */
function doMap (array) {
  return array.map((item, index) => {
    console.log(item)
    console.log(index)
  })
}

/**
 * 6. reduce()
 *  6.1 接收一个累加器，数组中的每个值都开始（从左到右）合并，最终为一个值
 *  6.2 arr.reduce(fn,initialValue)
 *   a: fn表示数组每一项执行的函数，接受4个参数
 *    1. previousValue 上一次调用回调返回的值，或者是提供的初始值
 *    2. value 数组中当前被处理元素的值
 *    3. index 当前元素在数组中的索引
 *    4. array  数组自身
 *   b: initialValue 指定第一次调用 fn 的第一个参数
 *
 * @param array
 * @returns {*}
 */
function doReduce (array) {
  return array.reduce((perv, value, index, array) => {
    console.log(perv)
    console.log(value)
    console.log(index)
    console.log(array)
    return perv * value
  }, 1)
}

/**
 * 7. reduceRight()
 *  7.1 接收一个方法作为累加器，数组中的每个值（从右至左）开始合并，最终为一个值。
 *  7.2 除了与reduce执行方向相反外，其他完全与其一致
 * @param array
 * @returns {*}
 */

/**
 * 8. entries()
 *  8.1 返回数组迭代器对象（iterator），该对象包含数组中每个索引的键值对
 * @param array
 */
function doEntries (array) {
  let _array = array.entries()

  for (let i = 0; i < _array.length; i++) {
    console.log(_array.next.value()) // [key,'value']
  }
}

/**
 * 9. keys()
 *  9.1 返回一个数组的迭代器
 *  9.2 可以便捷生成指定长度数组
 *  [...new Array(10).keys()] // [0,1,2,3,4,5,6,7,8,9]
 * @param array
 */
function doKeys (array) {
  let _array = array.keys()

  for (let i = 0; i < _array.length; i++) {
    console.log(_array.next()) // Object {value: 0, done: false}
  }
}

/**
 * 10. Symbol.iterator
 *  10.1 返回一个迭代器对象
 *  arr[Symbol.iterator]()
 */

// /**
//  * 删除数组中指定的第一个元素
//  * @param arr
//  * @param val
//  * @returns {*[]}
//  */
// function delArrayVal (arr = [], val = '') {
//   if (arr.includes(val)) {
//     return arr.splice(arr.indexOf(val), 1)
//   }
//   return arr
// }


// console.log('==== origin arrayD >>>>', arrayD.sort())
// console.log('==== origin arrayA >>>>', arrayA)
// console.log('===== uniqueV5  arrayA >>>>>', uniqueV5(arrayA))
