function instance_of (L, R) { // L是左表达式 R是右表达式
  let O = R.prototype // 取R的显示原型
  L = L.__proto__ // 取L的隐式原型

  while (true) {
    if (L === null) { // Object.prototype.__proto__ === null
      return false
    }

    if (L === O) { // 这里重点：当 O 严格等于 L 时，返回 true
      return true
    }

    L = L.__proto__
  }
}

//测试
function C () {}

function D () {}

let c = new C()

console.log(instance_of(c, C))
console.log(instance_of(c, D))

