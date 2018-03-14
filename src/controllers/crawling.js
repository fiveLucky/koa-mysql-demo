
const cheerio = require('cheerio')
const fs = require('fs')
const util = require('../util')

function saveImages () {
  const url = 'http://image.baidu.com/'
  util.getData({ url, agreement: 'http' }).then(res => {
    const $ = cheerio.load(res)
    console.log($('img'))
    $('a.imgitem img').each((i, item) => {
      const imgSrc = $(item).attr('src')
      util.getData({ url: imgSrc, agreement: 'https' }).then(res => {
        if (!fs.existsSync('../images')) {
          fs.mkdirSync('../images')
        }
        fs.writeFileSync('../imags/' + Math.random + '.png', res, 'binary', (err) => {
          if (!err) {
            console.log('保存成功')
          }
        })
      })
    })
  }).catch((err) => {
    console.log('出错了', err)
  })
}

module.exports = {
  saveImages
}
