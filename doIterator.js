// const Fib = {
//   [Symbol.iterator] () {
//
//     let n1 = 1
//     let n2 = 1
//
//     return {
//       [Symbol.iterator] () {
//         return this
//       },
//
//       next () {
//         let current = n2
//         n2 = n1
//         n1 = n1 + current
//         return { value: current, done: false }
//       },
//
//       return (v) {
//         console.log('Fibonacci sequence abandoned.')
//         return { value: v, done: true }
//       }
//     }
//   }
// }
//
// for (let v of Fib) {
//   console.log(v)
//
//   if (v > 100) {
//     break
//   }
// }

const _Iterator = arr => {
  let nextIndex = 0

  return {
    next: () =>
      nextIndex < arr.length
        ? { value: arr[nextIndex++], done: false }
        : { value: undefined, done: true }
  }
}

const Fib = {
  [Symbol.iterator] () {

    let n1 = 1
    let n2 = 1

    return {
      [Symbol.iterator] () {
        return this
      },

      next () {
        let current = n2
        n2 = n1
        n1 = n1 + current

        return { value: current, done: false }
      },

      return (v) {
        console.log('fib stop at here')
        return { value: v, done: true }
      }
    }
  }
}

for (let v of Fib) {
  console.log('v =>', v)

  if (v > 100) {
    break
  }
}

const Task = {
  [Symbol.iterator] () {
    let steps = this.actions.slice()

    return {
      [Symbol.iterator] () {
        return this
      },

      next (...args) {
        if (steps.length > 0) {
          let res = steps.shift()(...args)
          return { value: res, done: false }
        } else {
          return { done: true }
        }
      },

      return (v) {
        steps.length = 0
        return { value: v, done: true }
      }
    }
  },

  actions: []
}
