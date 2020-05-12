const arrLike = {
  length: 3,
  0: 'foo',
  1: 'bar',
}

const strArray = {
  length: 4,
  2: 'foo',
}

const points = [
  { x: 10, y: 20 },
  { x: 20, y: 30 },
  { x: 30, y: 40 },
  { x: 40, y: 50 },
  { x: 50, y: 60 },
  { x: 60, y: 70 },
  { x: 70, y: 80 },
  { x: 80, y: 90 },
]

let arr = Array.prototype.slice.call(arrLike)
// console.log('=== arr >>>', arr)

let arr2 = arr.slice()
// console.log('=== arr2 >>>', arr2)

let arr3 = Array.from(arrLike)
// console.log('=== arr3 >>>', arr3)

let arr4 = Array.from(strArray, (val, idx) => {
  if (typeof val === 'string') {
    return val.toUpperCase()
  } else {
    return idx
  }
})

// console.log('=== arr4 >>>', arr4)

let _p = points.find((point) => {
  return point.x % 3 == 0 && point.y % 4 == 0
})

console.log('=== _p >>>', _p)

