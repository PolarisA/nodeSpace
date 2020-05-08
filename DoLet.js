var w = 1, z = 2

function foo (x = 1 + w, y = x + 1, z = z + 1) {
  console.log(x, y, z)
}

foo()
