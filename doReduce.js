// const mockArray = [1, 2, 3, 4, 5, 6, 6, 7, 8, 9, 0, 10, 102, 12, 1, 22, 34, 45, 21]
const mockArray = [1, 2, 1]

const mArray = [1000, 200, 30, 4, 0.5]

const words = ['one', 'two', 'three'];

const numbers = [6.1, 4.2, 6.3];

const arrString = 'abcdaabc';

const userList = [
  {
    id: 1,
    username: 'john',
    sex: 1,
    email: 'john@163.com'
  },
  {
    id: 2,
    username: 'jerry',
    sex: 1,
    email: 'jerry@163.com'
  },
  {
    id: 3,
    username: 'nancy',
    sex: 0,
    email: ''
  }
];

const wizards = [
  {
    name: 'Harry Potter',
    house: 'Gryfindor'
  },
  {
    name: 'Cedric Diggory',
    house: 'Hufflepuff'
  },
  {
    name: 'Tonks',
    house: 'Hufflepuff'
  },
  {
    name: 'Ronald Weasley',
    house: 'Gryfindor'
  },
  {
    name: 'Hermione Granger',
    house: 'Gryfindor'
  }
];

const testStr = {
  env: 'development',
  proxy: false,
  subdomainOffset: 2
}

const keyByUsernameReducer = (acc, person) => {
  return { ...acc, [person.id]: person }
}

const only = (obj, keys) => {
  obj = obj || {}
  if (typeof keys == 'string') {
    keys = keys.split(/ +/)
  }

  return keys.reduce((ret, key) => {
    if (null == obj[key]) return ret

    ret[key] = obj[key]
    return ret
  }, {})
}

const addFun = (array) => {
  return array.reduce((prev, curr) => {
    return prev + curr
  })
}

const sumFun = (sumSoFar, item) => {
  sumSoFar.sum = sumSoFar.sum + item
  return sumSoFar
}

const everyTime = (res, cur) => {
  res[cur] ? res[cur]++ : res[cur] = 1
  return res
}

const toHtmlLi = (html, wizard) => {
  if (wizard.house === 'Hufflepuff') {
    html += '<li>' + wizard.name + '</li>';
  }
  return html
}

const groupBy = (obj, num) => {
  obj = obj || {}
  let _num = Math.floor(num)

  return obj[_num] = num
}

const userObj = userList.reduce(keyByUsernameReducer, {})
const _sumNumber = mArray.reduce(sumFun, { sum: 0 })
const _everyTime = arrString.split('').reduce(everyTime, {})
const _toHtmlLi = wizards.reduce(toHtmlLi, '')

// console.log('==== only(a,[env,proxy]) ==>', only(testStr, 'env + proxy + subdomainOffset'))


// console.log('==== _everyTime >>>', _everyTime)
console.log('===== _toHtmlLi >>', _toHtmlLi)

/**
 * reduce
 *
 *
 *
 */
