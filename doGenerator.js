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
