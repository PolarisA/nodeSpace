/**
 * @Author : HuiWen
 * @Date : 2019-11-28
 * @Description :
 **/

const isEmptyObject = (obj) => {
  for (let t in obj) {
    return false
  }
  return true
}

const objA = {
  keys1: 'value1',
  keys2: 'value2',
  keys3: 'value3',
  twins1: {
    keys4: 'value4',
    keys5: 'value5',
    keys6: 'value6',
    keys7: 'value7',
    twins2: {
      keys8: 'value8',
    },
    twins3: {
      keys9: 'value9',
    },
  },
  keys10: 'value10',
  twins4: {
    keys11: 'value11',
    keys12: 'value12',
    twins5: {
      keys13: 'value13',
    },
  },
  twins6: {
    keys14: 'value14',
  },
}

const objB = {
  keys3: 'value30',
  twins1: {
    keys4: 'value40',
    keys7: 'value70',
    twins2: {
      keys8: 'value80',
    },
    twins3: {
      keys9: 'value90',
    },
  },
  keys10: 'value100',
  twins4: {
    keys11: 'value110',
  },
}

// // 手动实现一个深度拷贝
const deepClone = (target) => {
  if (typeof target === 'object' && target !== null) {
    const cloneTarget = Array.isArray(target) ? [] : {}

    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {

        cloneTarget[prop] = deepClone(target[prop])

        console.log('===== deepClone(target[prop]) >>>>', deepClone(target[prop]))
      }
    }

    return cloneTarget
  } else {
    return target
  }
}

// console.log('==== mergeObj >>>', mergeObj(objA, objB))
// console.log('==== mergeObj >>>', Object.getOwnPropertyNames(objA))
console.log('==== mergeObj >>>', deepClone(objA))
