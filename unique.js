const strA = [1, 14, 34, 5, 23, 45, '45', 'a', 'aa', true, 1, '1', 124, 14, 5, 'bb', 'README.md', 'a', 'A']
const strB = [1, [1, 2, 2, 3, '2', 2, '22', 3], 5, 6, 34, 23, 43, 34, ['a'], 'a', [
    [2],
    [2, 3, 4, ],
    [2]
]]
const strC = [
    { name: 'Alcie', age: 14 },
    { name: 'Bob', age: 15 },
    { name: 'Pan', age: 16 },
    { name: 'Jone', age: 18, sex: '男' },
    { name: 'Pan', age: 16, },
    { name: 'Bob', age: 15 },
    { name: 'Bob', age: 16, sex: '男' },
]

var strD = [1, 1, '1', '1', null, null, undefined, undefined, new String('1'), new String('1'), /a/, /a/, NaN, NaN];

function uniqueV1(array) {
    const res = []

    for (let i = 0, arrayLen = array.length; i < arrayLen; i++) {
        for (var j = 0, resLen = res.length; j < resLen; j++) {
            if (array[i] === res[j]) {
                break
            }
        }

        if (j === resLen) {
            res.push(array[i])
        }
    }
    return res
}

function uniqueV2(array) {
    const res = []

    for (let i = 0, len = array.length; i < len; i++) {
        let current = array[i]
        console.log('=== res.indexOf(current) >>>', res.indexOf(current))
        if (res.indexOf(current) === -1) {
            res.push(current)
        }
    };
    return res
}

function uniqueV3(array, isSorted, iteratee) {
    const res = []
    const seen = []

    for (var i = 0; i < array.length; i++) {
        let value = array[i]
        let computed = iteratee ? iteratee(value, i, array) : value

        if (isSorted) {
            if (!i || seen !== computed) {
                res.push(value)
            }
            seen = computed
        } else if (iteratee) {
            if (seen.indexOf(computed) === -1) {
                seen.push(computed)
                res.push(value)
            }
        } else if (res.indexOf(value) === -1) {
            res.push(value)
        }
    };

    return res
}


function uniqueV4(array) {
    const res = array.filter((item, index, array) => {
        return array.indexOf(item) === index
    })

    return res
}

function uniqueV5(array) {
    const res = array.concat().sort().filter((item, index, array) => {
        return !index || item !== array[index - 1]
    })
    return res
}

/**
 * [uniqueV6 有问题的去重 1 和 ’1‘ 看做是一个元素]
 * @param  {[type]} array [description]
 * @return {[type]}       [description]
 */
function uniqueV6(array) {
    const obj = {}
    return array.filter((item, index, array) => {
        return obj.hasOwnProperty(item) ? false : (obj[item] = true)
    })
}

function uniqueV7(array) {
    return Array.from(new Set(array))
}

function uniqueV8(array) {
    return [...new Set(array)]
}


function uniqueV9(array) {
    const res = []

    for (var i = 0; i < array.length; i++) {
        let current = array[i]
        if (Array.isArray(array[i])) {
            res.push(uniqueV9(array[i]))
        } else if (res.indexOf(current) === -1) {
            res.push(current)
        }
    };
    return res
}

function uniqueV10(array) {
    const obj = {}

    return array.filter((item, index, array) => {
        console.log(typeof item + JSON.stringify(item))
        return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ?
            false : (obj[typeof item + JSON.stringify(item)] = true)
    })
}


console.log('== uniqueV10 >>', uniqueV10(strC))
// console.log('== uniqueV9 >>', uniqueV9(strB))

// console.log('==== uniqueV2 >>>', uniqueV3(strA, false, (item) => {
//     return typeof item === 'string' ? item.toLowerCase() : item
// }))


// console.log('== uniqueV8 >>', uniqueV8(strA))





















console.log("\n==== 🚀 = 🚀 = 🚀 ====")