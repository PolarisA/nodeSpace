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
