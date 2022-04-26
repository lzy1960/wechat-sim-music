const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const isPhone = (str) => {
  return /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(str)
}

// 防抖
const debounce = (() => {
  let timer = null
  return (callback, ms = 200) => {
    clearTimeout(timer)
    timer = setTimeout(callback, ms)
  }
})()

// 节流
const throttle = (() => {
  var prev = Date.now()
  return (callback, delay = 1000) => {
    var now = Date.now()
    if (now - prev > delay) {
      callback()
      prev = Date.now()
    }
  }
})()

module.exports = {
  formatTime,
  isPhone,
  debounce,
  throttle
}