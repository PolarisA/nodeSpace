const me = (function Hello (name) {
  function getting () {
    return 'Hello ' + name
  }

  return { getting }
})('hankins')

console.log('=== getting >>>', me.getting())
// me.getting()
