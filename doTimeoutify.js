function asyncify (fn) {
  let org_fn = fn
  let intv = setTimeout(() => {
    intv = null
    fn && fn()
  }, 0)

  fn = null

  return function () {
    if (intv) {
      fn = org_fn.bind.apply(org_fn, [this].concat([].slice.call(arguments)))
    } else {
      org_fn.apply(this, arguments)
    }
  }
}
