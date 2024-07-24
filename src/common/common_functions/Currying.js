// 连续求和
const add = (...arg) => arg.reduce((prev, curr) => curr += prev, 0)
const currying = (fn, ...prevArgs) => (...currArgs) => currArgs.length
  ? currying(fn, ...prevArgs, ...currArgs)
  : fn(...prevArgs)
const curryingAdd = currying(add);
curryingAdd(1, 2)(3)(4)();
curryingAdd(1, 2)(3, 4)();
curryingAdd(1)(2)(3)(4)();

// 个性化log
const coloring = fn => ({ background, color = 'white' }) => (...text) => fn(`%c${text.join('')}`, `color:${color};background:${background}`);
const colors = {
  primary: '#007bff',
  success: '#28a745',
  warning: '#ffc107',
  danger: '#dc3545',
  info: '#17a2b8',
};
const dir = (key = '', value = {}) => {
  logs.primary(`++++++++++++start:${key}++++++++++++++`);
  console.dir(value);
  logs.primary(`++++++++++++end:${key}++++++++++++++`);
};
const logs = Object.keys(colors)
  .reduce((prev, curr) => ({
    ...prev,
    [curr]: coloring(console.log)({ background: colors[curr] })
  }), { dir });

logs.warning('warning');


// 小程序api promise化
wx.showToast({
  title: '成功',
  icon: 'success',
  duration: 2000,
  success: function (res) {
    //TODO
  },
  fail: function (err) {
    // TODO
  }
});

const promisefy = fn => defaultProps => extraProps => new Promise((resolve, reject) => fn({
  ...defaultProps,
  ...extraProps,
  success: res => resolve(res),
  fail: err => reject(err),
}));

const showToast = promisefy(wx.showToast)({
  title: '',
  icon: "none",
  duration: 2000,
  confirmColor: '#ff673f',
  mask: true
});
showToast({ title: 'title' });



