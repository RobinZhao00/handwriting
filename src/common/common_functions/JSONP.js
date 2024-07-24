const getQueriesByObj = (object, prefix = "") => Object.keys(object)
  .reduce((prev, curr) => (prev += `${curr}=${encodeURIComponent(object[curr])}&`), prefix)
  .slice(0, -1);

const jsonp = ({ url, params = {} }) => new Promise((resolve, reject) => {
  const script = document.createElement('script');
  const cbKey = `_jsonp${Math.random().toString().substring(2)}`;
  window[cbKey] = result => {
    delete window[cbKey];
    script.remove(); // 将添加到页面中的script标签移除
    return resolve(result);
  };
  script.type = 'text/javascript';
  script.id = cbKey;
  script.src = getQueriesByObj({ ...params, callback: cbKey }, url.includes('?') ? url : `${url}?`);
  document.body.append(script);
});

jsonp({
  url: "https://www.w3schools.com/js/demo_jsonp2.php",
  params: {},
}).then(console.log);

