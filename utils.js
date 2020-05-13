/**
 * @Description:
 * @author HuiWen
 * @date 2020/2/14
 */
const CASH = 1234567890

const formatCash = (str) => {
  // console.log('==== str.split >>>', str.split(''))
  return str && (str + '').split('').reverse()
  // return str.split('').reverse().reduce((prev, next, index) => {
  //   return ((index % 3) ? next : (next + ',')) + prev
  // })
}


console.log(formatCash(CASH))


module.exports = {
  formatCash
}
