Function.prototype.bind2 = function (context) {
  var self = this
  var args = Array.prototype.slice.call(arguments, 1)

  return function () {
    var bindArgs = Array.prototype.slice.call(arguments)
    return self.apply(context, args.concat(bindArgs))
  }
}
