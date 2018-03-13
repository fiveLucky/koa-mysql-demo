const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
require('./color')

const pexsPath = path.resolve(__dirname, '../src/pexs')
const npmrcContent = fs.readFileSync(path.resolve(__dirname, '../.npmrc'), 'utf-8')
const resolvePath = path.resolve(__dirname, '../ykit.js')

const error = (text) => {
  console.log(`\n😭   ${text}\n`.red)
  process.exit(1)
}
const success = (text) => {
  console.log(`\n😁   ${text}\n`.green)
  process.exit()
}
const warning = (text) => {
  console.log(`\n😢   ${text}\n`.yellow)
  process.exit()
}
function link () {
  const newContent = fs.readFileSync(resolvePath, 'utf-8').replace('@wnpm/pexs', pexsPath)

  const tPath = npmrcContent.split('pexsAlias=')[1]

  if (!tPath) {
    error('请在.npmrc文件中配置pexs源工程lib文件夹的绝对路径，格式: pexsAlias=xxxxx/pexs/lib')
  } else if (!fs.existsSync(tPath)) {
    error('.npmrc文件中配置pexs项目的绝对路径无效，请检查！')
  }
  const targetPath = tPath.replace(/\s/g, '')

  if (fs.existsSync(pexsPath)) {
    warning('已经执行link操作，无需再次执行')
  }

  const ignore = fs.readFileSync(path.resolve(__dirname, '../.gitignore'), 'utf-8')

  if (ignore.indexOf('src/pexs') === -1) {
    fs.appendFileSync(path.resolve(__dirname, '../.gitignore'), '\n src/pexs')
  }
  if (!fs.existsSync(pexsPath)) {
    fs.mkdirSync(pexsPath)
  }

  execSync(`ln -s ${targetPath}  ${pexsPath}/lib`)

  fs.writeFileSync(resolvePath, newContent)

  success('勾搭成功！请重启服务，开始调戏！')
}

function unlink () {
  if (!fs.existsSync(pexsPath)) {
    warning('未执行link，无效的操作')
  }

  const newContent = fs.readFileSync(resolvePath, 'utf-8').replace(/\/Users.*\/pexs/, '@wnpm/pexs')

  fs.writeFileSync(resolvePath, newContent)

  if (fs.existsSync(pexsPath)) {
    execSync(`rm -rf ${pexsPath}`)
  }

  success('分手快乐！请重启服务，开始单身狗的生活！')
}

if (process.argv[2] === '-b') {
  link()
} else if (process.argv[2] === '-e') {
  unlink()
}
