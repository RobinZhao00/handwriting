class MyPromise {
  constructor(props) {
    this.STATE = {
      PENDING: 'pending',
      RESOLVED: 'resolved',
      REJECTED: 'rejected',
    }
    this.status = this.STATE.PENDING
    this.data = undefined
    this.resolvedCallbacks = []
    this.rejectedCallbacks = []
    this.fn = props
    this.doTask()
  }

  doTask = () => {
    const { resolve, reject } = this
    try {
      this.fn(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  resolve = (data) => {
    if (this.status === this.STATE.PENDING) {
      this.status = this.STATE.RESOLVED
      this.data = data
      this.resolvedCallbacks.forEach(cb => cb(data))
    }
  }

  reject = (data) => {
    if (this.status === this.STATE.PENDING) {
      this.status = this.STATE.REJECTED
      this.data = data
      this.rejectedCallbacks.forEach(cb => cb(data))
    }
  }

  handleResolve = (resolve, reject, handler) => {
    try {
      const ret = handler(this.data)
      if (ret instanceof MyPromise) {
        ret.then(resolve, reject)
        return
      }
      resolve(ret)
    } catch (e) {
      reject(e)
    }
  }

  handleReject = (resolve, reject, handler) => {
    try {
      const ret = handler(this.data)
      if (ret instanceof MyPromise) {
        ret.then(resolve, reject)
        return
      }
      reject(ret)
    } catch (e) {
      reject(e)
    }
  }

  then = (onFulfilled, onRejected) => {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : e => {throw e}
    const actions = {
      resolved: () => new MyPromise((resolve, reject) => setTimeout(() =>
        this.handleResolve(resolve, reject, onFulfilled),
      )),
      rejected: () => new MyPromise((resolve, reject) => setTimeout(() =>
        this.handleReject(resolve, reject, onRejected),
      )),
      pending: () => new MyPromise((resolve, reject) => {
        this.resolvedCallbacks.push(() => setTimeout(() =>
          this.handleResolve(resolve, reject, onFulfilled),
        ))
        this.rejectedCallbacks.push(() => setTimeout(() =>
          this.handleReject(resolve, reject, onRejected),
        ))
      }),
      default: () => {
        throw new Error('sth may happened ~')
      },
    }
    return actions[this.status]
      ? actions[this.status]()
      : actions.default()
  }

  catch = (onRejected) => {
    return this.then(null, onRejected)
  }

  static resolve = (res) => new MyPromise(resolve => resolve(res))
  static reject = (reason) => new MyPromise((reject, resolve) => reject(reason))

  static all = promises => new MyPromise((resolve, reject) => {
    const result = []
    const { length } = promises
    promises.forEach((promise, idx) => MyPromise.resolve(promise).then(value => {
      result[idx] = value
      if (result.length === length) {
        return resolve(result)
      }
    }, reject))
  })

  static allSettled = promises => new MyPromise(resolve => {
    const result = []
    const { length } = promises
    promises.forEach((promise, idx) => MyPromise.resolve(promise).then(
      value => {
        result[idx] = {
          status: 'fulfilled',
          value,
        }
        if (result.length === length) {
          return resolve(result)
        }
      },
      reason => {
        result[idx] = { status: 'rejected', reason }
        if (result.length === length) {
          return resolve(result)
        }
      }))
  })

  static race = promises => new MyPromise((resolve, reject) => promises.forEach(promise => MyPromise.resolve(promise).then(resolve, reject)))
}


new MyPromise((resolve, reject) => {
  reject('失败')
}).then().then().then(data => {
  console.log(data)
}, err => {
  console.log('err', err)
})

MyPromise.resolve(1).then(console.log)
MyPromise.reject(1).then(console.log)


// Promise.race
Promise.myRace = promises => new Promise((resolve, reject) => promises.forEach(promise => Promise.resolve(promise).then(resolve, reject)))

const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 200, 'promise1')
})
const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, 'promise2')
})
Promise.myRace([promise1, promise2]).then(value => {
  console.log(value)
})

// Promise.myAllSettled
Promise.myAllSettled = promises => new Promise(resolve => {
  const result = []
  const { length } = promises
  promises.forEach((promise, idx) => Promise.resolve(promise).then(
    value => {
      result[idx] = {
        status: 'fulfilled',
        value,
      }
      if (result.length === length) {
        return resolve(result)
      }
    },
    reason => {
      result[idx] = { status: 'rejected', reason }
      if (result.length === length) {
        return resolve(result)
      }
    }))
})

// Promise.all
Promise.myAll = promises => new Promise((resolve, reject) => {
  const result = []
  const { length } = promises
  promises.forEach((promise, idx) => Promise.resolve(promise).then(value => {
    result[idx] = value
    if (result.length === length) {
      return resolve(result)
    }
  }, reject))
})

const addEventListener = (node = 'button', type = 'click') => new Promise((resolve, reject) => {
  const dom = document.querySelector(node)
  if (dom) {
    dom.addEventListener('click', (event) => resolve(event))
    return
  }
  return reject()
})

addEventListener('button').then(() => {
  alert('ok')
})


