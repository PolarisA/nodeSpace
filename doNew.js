function create () {
  let obj = new Object()
  let Con = [].slice.call(arguments)

  obj.__proto__ = Con.prototype
  let ret = Con.apply(obj, arguments)
  return ret instanceof Object ? ret : obj
}
