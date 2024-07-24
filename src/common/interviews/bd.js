const dataSource = JSON.stringify({ a: { name: 100 }, b: 1 })

const isObject = val => Object.prototype.toString.call(val) === '[object Object]'

const findKvs = (testData = dataSource, key = 'name', value = 100) => {
  testData = JSON.parse(testData) || {}
  const resultObj = {}
  const workTree = (data, result) => {
    const isObj = isObject(data)
    if (!isObj) return
    const hasKey = Object.keys(data).find(key)
    if(hasKey) {
      resultObj[key] = data[key];
    }
    return Object.entries(data).reduce((prev, [k, v]) => isObject(v) && workTree(v, prev), result)
  }
  workTree(testData, resultObj)
  return resultObj
}
