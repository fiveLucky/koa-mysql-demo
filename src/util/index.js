
const http = require('http')
const https = require('https')

function getData (options) {
  const defaultOptions = {
    agreement: 'http',
    url: '',
    ...options
  }
  return new Promise((resolve, reject) => {
    const { url, agreement } = defaultOptions
    if (!url && typeof url !== 'string') {
      return
    }
    let result = ''
    const error = {}
    const a = {
      http, https
    }
    a[agreement].get(url, (res) => {
      const { statusCode } = res
      if (statusCode !== 200) {
        error.msg = '请求失败!'
        error.type = 'httpError'
        error.status = statusCode
        reject(error)
      }
      // 接收数据
      res.on('data', (data) => {
        const d = data.toString('utf8')
        result += d
      })
      // 接收完成
      res.on('end', () => {
        resolve(result)
      })
    }).on('error', (err) => {
      reject(err)
    })
  })
}

module.exports = {
  getData
}
