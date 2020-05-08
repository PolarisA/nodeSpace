const mStr = 'hello 大家好,我是渣渣辉'
const mArray = ['hello', '大家好', '我是渣渣辉']
const mObj = { title: "hello", content: '大家好，我是渣渣辉' }
const mDate = new Date()
const mBoolean = Boolean(true)
const mNumber = new Number(1314)

/**
 * Clone Ways 1
 * 存在明显的局限性
 * 对于 String Boolean Date RegExp 数据无法完成复制
 * @param obj
 * @returns {[]|{}}
 */
const deepClone = (obj) => {
  let newObj = obj instanceof Array ? [] : {}
  for (let i in obj) {
    newObj[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
  }
  return newObj
}

const baseClone = (base) => {
  return base.valueOf()
}


let nObj = deepClone(mObj)
// console.log('=== nObj >>>', nObj)

let bRes = baseClone(mNumber)
console.log('=== origin >>>', mNumber)
console.log('=== bStr >>>', bRes)
