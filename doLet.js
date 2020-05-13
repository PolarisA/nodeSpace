const defaults = {
  options: {
    remove: true,
    enable: false,
    instance: {}
  },
  log: {
    warn: true,
    error: true
  }
}

const config = {
  options: {
    remove: false,
    instance: null
  }
}

const o = {
  __id: 10,
  get id () { return this.__id++ },
  set id (v) { this.__id = v }
}

// function foo (strings, ...values) {
//   console.log('=== >>', strings)
//   console.log('==>>', values)
// }
//
// const str = 'awesome'
// foo`Everything is ${str}`

const a = ['a', 'b', 'c', 'd', 'e']

for (let val, ret, it = a[Symbol.iterator]();
  (ret = it.next()) && !ret.done;
) {
  val = ret.value
  console.log(val)
}
