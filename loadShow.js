let value = 2

let foo = {
  value: 3
}

function bar (name, age) {
  console.log('=== arguments >>>>', arguments)
  console.log('=== this >>>>', this)
  console.log('==== name >>>', name)
  console.log('==== age >>>', age)

  return {
    value: this.value,
    name,
    age
  }
}

// bar.call(foo, 'javaScript', 25)

// let bindArg1 = bar.bind(foo, 'JS',)
//
// console.log('===== bindArg1 >>>', bindArg1)
// bindArg1('20', '21')

var nickName = 'Bob'

function Person (name) {
  this.nickName = name

  this.distractedGreeting = function () {
    setTimeout(function () {
      console.log('hello this nickName is >>', this.nickName)
    }.bind(this), 500)
  }
}

/**
 * 首先，new调用的优先级最高，只要有new关键字，this就指向实例本身；
 * 接下来如果没有new关键字，有call、apply、bind函数，那么this就指向第一个参数；
 * 然后如果没有new、call、apply、bind，只有obj.foo()这种点调用方式，this指向点前面的对象；
 * 最后是光杆司令foo() 这种调用方式，this指向window（严格模式下是undefined）。
 */
let person = new Person('alice')
person.distractedGreeting()

