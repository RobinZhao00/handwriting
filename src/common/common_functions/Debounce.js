const debounce = (fn, delay = 1000) => {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }
}
// 合并
// demo 地址 https://codepen.io/DrivingFatigue/pen/MWeayEO
