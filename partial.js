function partialV(fun) {
  let args = [].slice.call(arguments, 1)
  return function () {
    let newArgs = args.concat([].slice.call(arguments))
    return fun.apply(this, newArgs)
  }
} 
