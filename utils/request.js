import {
  BASE_URL
} from "./config"

export default (url, data, method = 'GET') => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + url,
      data,
      method,
      success: (res) => {
        // console.log('请求成功', res)
        resolve(res.data)
      },
      fail: (err) => {
        // console.log('请求失败', err)
        reject(err)
      }
    })
  })
}