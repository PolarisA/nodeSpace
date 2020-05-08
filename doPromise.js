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

console.log('==== proTest >>>', proTest())

