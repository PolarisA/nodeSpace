const Url = 'w.url.cn/s/Aq7Dw2B'
// 3651274453 61162421

const uinCode = ['011', '110', '101', '001', '010', '111', '100', '100', '101', '011', '110', '001', '001', '110', '010', '100', '010', '001']
// const _inCode = ['100', '001', '010', '110', '101', '000', '011', '011', '010', '100', '001', '110', '110', '001', '101', '011', '101', '110']

const insCode = (code) => {
  return parseInt(code, 2)
}

let _keys = []
uinCode.map((item, index) => {
  // console.log('== >>>', insCode(item))
  _keys.push(insCode(item))
})


console.log('==== >>>', _keys.join(''))

