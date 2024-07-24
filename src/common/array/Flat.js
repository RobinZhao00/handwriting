Array.prototype.myFlat = function() {
  let thisArr = this
  const flat = (arr = []) => arr.reduce((prev, curr) => Array.isArray(curr) ? [...prev, ...flat(curr)] : [...prev, curr], [])
  return flat(thisArr)
}
