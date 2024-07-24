class StringManager {
  constructor(props) {
    this.str = props || ''
  }

  toCamelCase = () => {
    this.str = this.str.replace(/\_(\w)/, (all, letter) => letter.toLocaleUpperCase())
    // return this
  }
  toUnderLineCase = () => {
    this.str = this.str.replace(/([A-Z]|-)/g, '_$1').toLocaleUpperCase()
    // return this
  }
  toCenterLineCase = () => {
    this.str = this.str.replace(/([A-Z]|_)/g, '-$1').toLocaleUpperCase()
    // return this
  }

  val = () => this.str
}

const getQueriesByUrl = (url = window.location.href) => {
  const [host, rawQuery] = url.split('?')
  return rawQuery.split('?').reduce((prev, curr) => {
    const [key, value] = curr.split('=')
    return {
      ...prev,
      [key]: value,
    }
  }, {})
}

export {
  StringManager,
  getQueriesByUrl,
}
