const arrays = [1, 2, 3, 4, 5]
const worlds = 'hello hankins'

const iA = arrays[Symbol.iterator]()

const iW = worlds[Symbol.iterator]()

for (let i = 0; i <= worlds.length; i++) {
  console.log(iW.next())
}




