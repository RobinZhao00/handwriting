class StorageManager {
  constructor() {
    this.storage = localStorage
    this.events = {}
    this.storage.setItem = function(key, value) {
      const setItemEvent = new Event('setItemEvent')
      setItemEvent.newValue = {
        key, value,
      }
      window.dispatchEvent(setItemEvent)
    }
    window.addEventListener('setItemEvent', (e) => {
      const { key, value } = e.newValue
      this.pub(key, value)
    })
  }

  clear = () => this.storage.clear()
  get = key => this.storage.getItem(key) && JSON.parse(this.storage.getItem(key))
  key = idx => this.storage.key(idx)
  set = (key, value) => this.storage.setItem(key, JSON.stringify(value))
  length = () => this.storage.length
  remove = key => this.storage.removeItem(key)

  sub = (type, fn) => {
    this.events[type] = this.events[type] || []
    this.events[type].push(fn)
  }

  pub = (type, value) => {
    const evts = this.events[type] || []
    evts.forEach(evt => evt && evt(value))
  }
}


// window.onstorage = () => {
//   // When local storage changes, dump the list to
//   // the console.
//   console.log(JSON.parse(window.localStorage.getItem('sampleList')));
// };

const storage = new StorageManager()
storage.sub('test', (val) => console.log('test', val))
storage.set('test', { b: 1 })


export {
  StorageManager,
}
