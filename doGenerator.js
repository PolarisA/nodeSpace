function run (gen) {
  const g = gen()

  function next (data) {
    let res = g.next(data)

    if (res.done) {
      return res.value
    }

    res.value.then(function (data) {
      next(data)
    })
  }

  next()
}

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
