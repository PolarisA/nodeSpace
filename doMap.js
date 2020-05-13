const mapToObj = (map) => {
  let obj = Object.create(null)

  for (let [key, values] of map) {
    obj[key] = values
  }
  return obj
}

const objToMap = (obj) => {
  let map = new Map()

  for (let key of Object.keys(obj)) {
    map.set(key, obj[key])
  }
  return map
}

const mapToJSON = (map) => {
  return JSON.stringify([...map])
}

const JSONToMap = (json) => {
  return objToMap(JSON.parse(json))
}

export {
  mapToObj,
  objToMap,
  mapToJSON,
  JSONToMap,
}
