const longCommonPrefix = (strs) => {

  if (strs === null || strs.length === 0)
    return ''

  if (strs.length === 1) return strs[0]

  let max = 0, min = 0
  for (let i = 0; i < strs.length; i++) {
    if (strs[i] < strs[min]) {
      min = i
    }
    if (strs[i] > strs[max]) {
      max = i
    }
  }

  for (let j = 0; j < strs[min].length; j++) {
    if (strs[min].charAt(j) !== strs[max].charAt(j)) {
      return strs[min].substring(0, j)
    }
  }
}

const tests = ['flower', 'flow', 'flight']

console.log(longCommonPrefix(tests))
