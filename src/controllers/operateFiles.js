const fs = require('fs')

function write (data) {
  fs.writeFileSync('output.txt', data, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('ok')
    }
  })
}
function read () {
  const data = fs.readFileSync('something.txt')
  return data.toString()
}
function status () {
  fs.stat('output.txt', (err, stat) => {
    if (err) throw err
    console.log(stat)
  })
}

module.exports = {
  read,
  write,
  status
}
