function Bar() {
  this.bar = 40
}

Bar.answer = function () {
  return 45
}

Bar.prototype.baz = function () {
  return 'this is baz'
}

console.log(Bar.prototype.baz())
