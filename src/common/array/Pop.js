Array.prototype.myPop = function() {
  const array = this
  const { length } = array
  array.length = array.length - 1
  return length
}









