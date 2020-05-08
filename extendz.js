Function.prototype._apply = function (targetOrigin, argsArray) {
  if (typeof argsArray === 'undefined' || argsArray == null) {
    argsArray = []
  }

  if (typeof targetOrigin === 'undefined' || targetOrigin == null) {
    targetOrigin = window
  }

  const targetFnKey = Symbol('key')
  targetOrigin[targetFnKey] = this

  const result = targetOrigin[targetFnKey](...argsArray)
  delete targetOrigin[targetFnKey]
  return result
}

const obj = {
  a: 2
}

function foo (something) {
  console.log('== this.a >>>', this.a, something)
  return this.a + something
}

const bar = function () {
  return foo._apply(obj, arguments)
}

let b = bar(3)

console.log('===== b >>>>', b)

///////////////////////////////////////

/**
 * new 构造函数执行顺序
 * 1. 在堆中开辟内存空间，记为obj
 * 2. 在obj中添加 __proto__ 属性并指向 构造函数 .prototype
 * 3. 将构造函数的this 指向 obj
 * 4. 执行构造函数内语句
 *  若构造函数中没有return 或者 return this或基本数据类型 （string,number,boolean,null,undefined）的值，
 *  则返回obj在堆中的内存地址；若return 引用类型，则返回值为这个引用类型
 * @returns {*}
 * @private
 */
function _new (...args) {
  let constructor = args[0] // 获取构造函数
  let obj = Object.create(constructor.prototype) //创建空对象，并将原型指向构造函数的原型
  let res = constructor.call(obj, ...args.slice(1)) // call 强行将this指向第一个参数

  if ((typeof res === 'object' || typeof res == 'function') && res !== null) {
    return res
  } else {
    return obj
  }
}

function People (name, age, phone) {
  this.name = name
  this.age = age
  this.phone = phone
}

let a = _new(People, 'aa', 20, '31321312312')
let na = new People('na', 30, '45524134')

console.log('=== a >>>>', a)
console.log('=== na >>>>', na)

function Animal (name) {
  this.name = name
}

const AnimalSingle = (function () {
  let animalSingle = null

  return function (name) {
    if (animalSingle) {
      return animalSingle
    }

    return animalSingle = new Animal(name)
  }
})()

const _animal1 = new AnimalSingle('cat')
const _animal2 = new AnimalSingle('dog')

console.log('==== _animal1 >>>', _animal1)
console.log('==== _animal2 >>>', _animal2)

///////////////////////////////////////

/**
 * compose
 * 将多个函数串行起来执行，一个函数的输出结果是另一个函数的入参
 */

const _compose = (funs) => {
  let length = funs.length

  let index = length

  while (index--) {
    if (typeof funs[index] !== 'function') {
      throw new TypeError('Expected a function')
    }
  }

  return function (...args) {

    let index = 0
    let res = length ? funs.reverse()[index].apply(this, args) : args[0]
    while (++index < length) {
      res = funs[index].call(this, res)
    }

    return res
  }
}



