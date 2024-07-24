class Iterator {
  constructor(props) {
    this.array = props
    this.currsor = -1
    this.done = false
  }

  next = () => {
    if (this.currsor - 1 > this.array.length) {
      this.done = true
      return { value: undefined, done: true }
    }
    this.currsor++
    return { value: this.array[this.currsor], done: false }
  }
}
