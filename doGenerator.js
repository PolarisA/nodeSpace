function * foo (x) {
  return x * (yield 'Hello')
}

const it = foo(6)

const ress = it.next()
console.log('=== ress >>>', ress.value)
const res = it.next(7)

console.log('=== res >>>', res.value)

function run (gen) {
  let args = [].slice.call(arguments, 1)
  let it = gen.apply(this, args)

  return Promise.resolve()
    .then(function handleNext (value) {
      let next = it.next(value)

      return (function handleResult (next) {
        if (next.done) {
          return next.value
        } else {
          return Promise.resolve(next.value)
            .then(handleNext, function handleError (err) {
              return Promise.resolve(it.throw(err)).then(handleResult)
            })
        }
      })(next)
    })
}

// function * foo () {
//   let x = yield 1
//   let y = yield 2
//   let z = yield 3
//   console.log(x, y, z)
// }
//
// let it = foo()

// for (let i = 0; i < 4; i++) {
//   console.log('it >>', it.next(i + '--'))
// }

function * foo () {
  try {
    yield 1
  } catch (err) {
    console.log(err)
  }

  yield 2

  throw 'Hello!'
}

let it = foo()

console.log('it next >>>', it.next())
// it.next()				// { value: 1, done: false }

try {
  it.throw('Hi!')	// Hi!
  // { value: 2, done: false }
  it.next()

  console.log('never gets here')
} catch (err) {
  console.log(err)	// Hello!
}
