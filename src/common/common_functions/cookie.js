class Cookie {
  constructor() {
    this.init();
  }

  init = () => {
    this.values = {};
    this.value = undefined;
    this.isParsed = false;
    this.parse();
  }

  parse = () => {
    this.values = document.cookie
      .split(/;\s/g)
      .reduce((prev, curr) => ({ ...prev, [`${curr.split('=')[0]}`]: curr.split('=')[1] }), {});
    this.isParsed = true;
    return this;
  }
  set = (key, value, expires, path = '/', domain = document.domain) => {
    if (!this.isParsed) {
      this.parse();
    }
    this.values[key] = value;
    const value2Set = {
      [`${key}`]: typeof value === 'string' ? value : JSON.stringify(value),
      expires,
      path,
      domain
    }
    const ck = Object.entries(value2Set).reduce((prev, [key, value]) => prev += `${key}${value ? `=${value};` : '=;'} `, '');
    console.log('**test**', 'ck', ck);
    document.cookie = ck
    this.isParsed = false;
    return this;
  }
  get = key => {
    if (!this.isParsed) {
      this.parse();
    }
    this.value = this.values[key];
    return this;
  }
  remove = key => {
    if (!this.isParsed) {
      this.parse();
    }
    if (this.values[key]) {
      delete this.values[key];
      this.set(key, '', 'Thu, 01 Jan 1970 00:00:00 UTC');
    }
    this.isParsed = false;
    return this;
  }
  clear = () => {
    if (!this.isParsed) {
      this.parse();
    }
    Object.keys(this.values).forEach(key => this.remove(key))
    this.init();
    return this;
  }
  val = () => this.value
  vals = () => {
    if (!this.isParsed) {
      this.parse();
    }
    return this.values;
  }
}


const cookie = new Cookie();
cookie.clear();
console.log('document.cookie', document.cookie);
