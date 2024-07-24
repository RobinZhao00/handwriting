//************ 1 start***************
// 1. ABCD
// 2. C
// 3. AB
// 4. B
// 5. AB
//************ 1 end***************

//************ 2 start***************
// 1. 错误
// 2. 错误
// 3. 错误
// 4. 错误
// 5. 错误
//************ 2 end***************

//************ 3 start***************
// 1. ws/wss
// 2. id > class > 标签
// 3. Promise.then .Promise.resolve Promise.all .Promise.race
// 4. 数据/ 数据
// 5. 生成html文件/ css文件优化压缩/ 分包
//************ 3 end***************

//************ 4 start***************
// 1. Set Vs Map


// 2. componentWillMount、componentDidMount、componentWillUnmount
// componentWillMount 好像没使用过，并没有什么用途，如果一定要用，可以做数据初始化
// componentDidMount：组件挂在完成，可以在这个钩子函数做一些异步的操作（例如ajax 请求）
// componentWillUnmount: 组件卸载，可以做一些内存清空的操作（闭包和定时器）

// 3.


// 4. BFC
// > 产生`BFC`的条件
//
// 1. html
// 2. float 不为none
// 3: position： absolute，fixed
// 4：display: inline-block、table-cells、flex
// 5: over-flow: 除了visible(hidden、auto、scroll)
//
//
// > `BFC` 特性
// 1. margin collapse
// 2. 可以包含浮动的元素（高度坍塌）
// 3. 隔离的独立容器
// 4. 计算BFC高度时，float 元素会参加
// 5. 浮动元素不会叠加到BFC上

//************ 4 end***************


//************ 5 start***************
// 1. promise
class MyPromise {
  static STATE_MAPPING = {
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',
  }

  constructor(props) {
    this.status = MyPromise.STATE_MAPPING.PENDING;
    this.data = undefined;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];
    this.fn = props;
    this.doTask();
  }

  doTask = () => {
    const { resolve, reject } = this;
    try {
      this.fn(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  resolve = (data) => {
    if (this.status === MyPromise.STATE_MAPPING.PENDING) {
      this.status = MyPromise.STATE_MAPPING.RESOLVED;
      this.data = data;
      this.resolvedCallbacks.forEach(cb => cb(data));
    }
  }

  reject = (data) => {
    if (this.status === MyPromise.STATE_MAPPING.PENDING) {
      this.status = MyPromise.STATE_MAPPING.REJECTED;
      this.data = data;
      this.rejectedCallbacks.forEach(cb => cb(data));
    }
  }

  handleResolve = (resolve, reject, handler) => {
    try {
      const ret = handler(this.data);
      if (ret instanceof MyPromise) {
        ret.then(resolve, reject);
      } else {
        resolve(ret);
      }
    } catch (e) {
      reject(e);
    }
  }

  handleReject = (resolve, reject, handler) => {
    try {
      const ret = handler(this.data);
      if (ret instanceof MyPromise) {
        ret.then(resolve, reject);
      } else {
        reject(ret);
      }
    } catch (e) {
      reject(e);
    }
  }

  then = (onFulfilled, onRejected) => {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : e => {throw e};
    const actions = {
      resolved: () => new MyPromise((resolve, reject) => setTimeout(() => this.handleResolve(resolve, reject, onFulfilled))),
      rejected: () => new MyPromise((resolve, reject) => setTimeout(() => this.handleReject(resolve, reject, onRejected))),
      pending: () => new MyPromise((resolve, reject) => {
        this.resolvedCallbacks.push(() => setTimeout(() => this.handleResolve(resolve, reject, onFulfilled)));
        this.rejectedCallbacks.push(() => setTimeout(() => this.handleReject(resolve, reject, onRejected)));
      }),
      default: () => {
        throw new Error('sth may happened ~')
      },
    };
    return actions[this.status]
      ? actions[this.status]()
      : actions.default();
  }

  catch = (onRejected) => {
    return this.then(null, onRejected);
  }
}

new MyPromise((resolve, reject) => {
  reject('失败');
}).then(data => {
  console.log(data);
}, err => {
  console.log('err', err);
})

// 2. debounce
const debounce = (fn, duration = 300) => {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      if (typeof fn !== 'function') {
        throw TypeError('fn must be a function~');
      }
      fn(...args);
      clearTimeout(timer);
      timer = null;
    }, duration);
  }
}
const debounceLog = debounce(console.log, 1000);
debounceLog(1, 2);
// 3. 途并描述过程

//************ 5 end***************
