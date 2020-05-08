/**
 * @Author : HuiWen
 * @Date : 2019-11-11
 * @Description :
 **/

function Animal(name) {
  this.name = name
  this.showName = function () {
    console.log(this.name)
  }
}

function Cat(name) {
  Animal.call(this, name)
}

let cat = new Cat('Hello Kity')

// cat.showName()


function addPropsLikeArray() {
  Array.prototype.push.call(arguments, 'Alice')
  console.log("==== arguments >>> ", arguments)
}

// addPropsLikeArray('Lucy', 'Poter')


let arr1 = [1, 2, 3]
let arr2 = [3, 4, 5, 6]
Array.prototype.push.apply(arr1, arr2)


const name = 'Alice'

const foo = {
  name: 'Bob',
  logName: function (age) {
    console.log("===== age >>>>>", this.name, age)
  }
}

const fooNew = foo.logName;
const fooNewBind = foo.logName.bind(foo);
// fooNew(13)
// fooNewBind(25)

Function.prototype.newCall = function (context, ...parameter) {
  if (typeof context === 'object' || typeof context === 'function') {
    context = context || window
  } else {
    context = Object.create(null)
  }

  let fn = Symbol()
  context[fn] = this
  const res = context[fn](...parameter)
  delete context.fn
  return res
}

let person = {
  name: 'Alice',
  age: 15,
}

function sayHi(age, sex) {
  console.log(this.name, age, sex)
}

// sayHi.newCall(person, 'F')


Function.prototype.newApply = function (context, parameter) {
  if (typeof context === 'object' || typeof context === 'function') {
    context = context || window
  } else {
    context = Object.create(null)
  }

  let fn = Symbol()
  context[fn] = this
  const res = context[fn](...parameter)
  delete context[fn]
  return res
}

// sayHi.newApply(person, [25, 'M'])


Function.prototype.newBind = function (context, ...innerArgs) {
  let me = this
  return function (...finnalyArgs) {
    return me.call(context, ...innerArgs, ...finnalyArgs)
  }
}

let personSayHi = sayHi.newBind(person, 35)
// personSayHi('X')


let throttle = function (func, delay) {
  let timer = null
  return () => {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, arguments)
        timer = null
      }, delay)
    }
  }
}

function debounce(fn, wait) {
  let timeout = null
  return function () {
    if (timeout !== null)
      clearTimeout(timeout)

    timeout = setTimeout(() => {
      fn.apply(this, arguments)
      timeout = null
    }, wait)
  }
}

const newV2 = function (func) {
  let o = Object.create(func.prototype)
  let k = func.call(o)
  if (k && typeof k === 'object') {
    return k
  } else {
    return o
  }
}

class Person {
  constructor(skin, language) {
    this.skin = skin
    this.language = language
  }

  say() {
    console.log('this is Father Component')
  }
}

class Chinese extends Person {
  constructor(skin, language, position) {
    super(skin, language)
    this.position = position
  }

  aboutMe() {
    console.log(`skin >>${this.skin}  language >>${this.language}   position >>${this.position}`)
  }
}

let obj = new Chinese('yellow', 'zh-han', 'Beijing')
// obj.aboutMe()
// obj.say()


const treeNodes = [
  {
    id: 1,
    name: '1',
    children: [
      {
        id: 11,
        name: '11',
        children: [
          {
            id: 111,
            name: '111',
            children: []
          },
          {
            id: 112,
            name: '112'
          }
        ]
      },
      {
        id: 12,
        name: '12',
        children: [
          {
            id: 121,
            name: '121',
            children: [
              {
                id: 1211,
                name: '1211',
                children: []
              },
            ],
          }
        ]
      }
    ],
    users: []
  },
];

const parseTree = function (treeNodes) {
  if (!treeNodes || !treeNodes.length) return

  for (let i = 0; i < treeNodes.length; i++) {
    let childs = treeNodes[i].children


    console.log("==== treeNodes[i].id  >>>", treeNodes[i].id)
    if (childs && childs.length > 0) {
      parseTree(childs)
    }
  }
}

// parseTree(treeNodes)


function deepClone(source) {
  const targetObj = source.constructor === Array ? [] : {}
  for (let keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source.constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

function createArray(...elements) {
  let handler = {
    get(target, propKey, receiver) {
      let index = Number(propKey)
      if (index < 0) {
        propKey = String(target.length + index)
      }

      return Reflect.get(target, propKey, receiver)
    }
  }

  let target = []
  target.push(...elements)
  return new Proxy(target, handler)
}


// let arr = createArray('a', 'b', 'c', 'd')
// console.log('== arr >>>',arr[-3])

const pipe = (function () {
  return function (value) {
    let funcStack = []
    let oproxy = new Proxy({}, {
      get: function (pipeObject, fnName) {
        if (fnName === 'get') {
          return funcStack.reduce(function (val, fn) {
            return fn(val)
          }, value)
        }
        funcStack.push(window[fnName])
        return oproxy
      }
    })
  }
}());
const double = n => n * 2;
const pow = n => n * n;
const reverseInt = n => n.toString().split("").reverse().join("") | 0;

// console.log("=== pipe(3) >>>>", pipe(3).double.pow.reverseInt.get)


const myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar
  }
}

const myReceiverObject = {
  foo: 4,
  bar: 5,
}

// console.log(Reflect.get(myObject, 'baz', myReceiverObject))

// console.log(Reflect.set(myObject, 'foo', 12))
// console.log(myObject.foo)

// console.log(Reflect.has(myObject, 'foo'))

// console.log(Reflect.deleteProperty(myObject, 'foo'))
console.log(myObject.foo)
