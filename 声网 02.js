// 用 React 或 Vue 编写一个可复用的倒计时计时器组件。
// 该组件应接收一个初始倒计时（以秒为单位）作为属性，并在倒计时结束时触发一个事件。
// 需要满足以下功能需求：
// 1.显示剩余时间（格式为 mm )
// 2.支持倒计时开始、暂停和重置功能。
// 3.倒计时结束时触发一个事件（例如，弹出一个警告或执行一个回调函数）。

export default {
  props: {
    count: {
      type: Number,
      default() {
        return 60
      }
    },
    cb: {
      type: Function
    }
  },
  data() {
    return {
      timer: null,
      countDown: 0,
      isPause: false,
    }
  },
  watch: {
    count: {
      handler(count) {
        if (count) {
          this.countDown = count;
          this.run();
        }
      }, immediate: true,
    },
  },
  computed: {
    text() {
      return this.countDown > 9 ? this.countDown : `0${this.countDown}`
    }
  },
  methods: {
    run() {
      this.timer = setInterval(() => {
        if (this.countDown > 0 && !this.isPause) {
          this.countDown--;
        }
        if (this.countDown === 0) {
          this.cb && this.cb()
        }
      }, 1000)
    },
    pause() {
      this.isPause = !this.isPause
      if (!this.isPause) {
        this.run();
      }
    },
    reset() {
      this.countDown = this.count
      this.run()
    },
  },
  destroy() {
    clearInterval(this.timer)
    this.timer = null
  },
  render() {
    return (
      <div>
        { countDown }
      </div>
    )
  }
}

const getNumber = (str) => {
  let result = ''
  for (let i = str.length -1; i >=0 ; i--) {
    const current = str[i]
    if(!result.includes(current)) {
      result += current
    }
  }
  return result
}

const quickSort = (arr) => {
  const { length } = arr;
  if (length <= 1) {
    return arr;
  }
  const left = [];
  const right = [];
  const pivotIdx = Math.floor(length / 2);
  const pivot = arr[pivotIdx];
  for (let i = 0; i < length; i++) {
    if (i !== pivotIdx) {
      const current = arr[i];
      if (current <= pivot) {
        left.push(current);
      } else {
        right.push(current);
      }
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
};

const sort = (str) => {
  const alphabets = [];
  const symbols = new Map();
  for (let i = 0; i < str.length; i++) {
    const current = str[i];
    if (/[a-z]/i.test(current)) {
      alphabets.push(current);
    } else {
      symbols.set(current, [...symbols.has(current) ? symbols.get(current) : [], i]);
    }
  }
  alphabets.sort((a, b) => a.localeCompare(b));
  for (const [key, value] of [...symbols.entries()]) {
    for (let i = 0; i < value.length; i++) {
      alphabets.splice(value[i],0,key)
    }
  }
  return alphabets.join('')
};
