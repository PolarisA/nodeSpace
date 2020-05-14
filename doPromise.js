// const sleep = (ms) => {
//   let template = new Promise(resolve => {
//     console.log('1111')
//     setTimeout(resolve, ms)
//   })
//   return template
// }
//
// sleep(1200).then(() => {
//   console.log('2222')
// })

function timeOut (delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Time out')
    }, delay)
  })
}

function delay (time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time)
  })
}

function proTest () {
  return new Promise((resolve => {
    let a = 'aaa'
    console.log('=== a >>>', a)
    resolve(a)
    return new Promise((resolve1 => {
      let b = 'bbb'
      console.log('=== b >>>', b)
      resolve1(b)
    }))
  }))
}

const p1 = new Promise((resolve, reject) => {
  resolve(42)
})

p1.then(function fulfilled (msg) {
  // foo.bar()
  console.log(msg)
}, function rejected (err) {
  console.log('err =>>>', err)
}).catch(e => {
  console.log('catch e >>', e)
})
console.log('==== proTest >>>', proTest())
