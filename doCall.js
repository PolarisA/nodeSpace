// Function.prototype.call2 = function (context) {
//   console.log('===== context >>>', context)
//   context = context ? Object(context) : (window || global)
//   console.log('===== context >>>>>>', context)
//   context.fn = this
//   let args = []
//   for (let i = 1; i < arguments.length; i++) {
//     args.push('arguments[' + i + ']')
//   }
//   let result = eval('context.fn(' + args + ')')
//   // context.fn()
//   delete context.fn
//   return result
// }

Function.prototype.call2 = function (context) {
  context = context ? Object(context) : window
  context.fn = this

  let args = [...arguments].slice(1)
  let result = context.fn(...args)
  delete context.fn

  return result
}

let value = 2

const foo = {
  value: 1
}

function bar (name, age) {
  console.log(this.value)
  return {
    value: this.value,
    name,
    age,
  }
}

// bar.call2(null)
// bar.call2(123)
// bar.call2(foo, 'Pan', '27')



