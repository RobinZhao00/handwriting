Array.prototype.myShift = function() {
  let thisArr = this
  const [first, ...remain] = thisArr
  const { length: remainLength } = remain
  for (let i = 0; i < remainLength; i++) {
    thisArr[i] = remain[i]
  }
  if (this.length > 1) {
    this.length--
    return first
  }
  return undefined
}
