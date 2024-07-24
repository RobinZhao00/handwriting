const getQueriesByObj = (object = {}, prefix = '') => Object.entries(object)
  .reduce((prev, [key, value]) => prev += `${key}=${value}&`, prefix)
  .slice(0, -1)

const ajax = (type = 'get') => (url = '', data, extraProps = {}) =>
  new Promise((resolve, reject) => {
    const defaultProps = { async: true, 'Content-type': 'application/x-www-form-urlencoded' }
    const props = { ...defaultProps, ...extraProps }
    const { async, baseUrl, queries = {} } = props
    const xhr = new XMLHttpRequest()
    // 获取完整的请求url
    if (!url.includes('http')) {
      url = `${baseUrl || window.location.origin}${url}`
    }
    if (type === 'get') {
      url = getQueriesByObj(queries, `${url}?`)
    }
    xhr.open(type, url, async)
    Object.entries(extraProps)
      .forEach(([key, value]) => xhr.setRequestHeader(key, value.toString()))
    // get or post
    data
      ? xhr.send(data)
      : xhr.send()
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          return resolve(xhr.response)
        }
        return reject(xhr.response)
      }
    }
  })

const testUrl = 'https://www.fastmock.site/mock/3410de68d1e03849d328e0b0651c4f1f/api/api/services/app/TransactionBill/GetTransactionBillInfo'
// const ajaxGet = ajax('get');
const ajaxPost = ajax('post')

ajaxPost(testUrl).then(console.log)
ajax('post')(testUrl).then(console.log)

// https://codepen.io/DrivingFatigue/pen/mdEeWMj

