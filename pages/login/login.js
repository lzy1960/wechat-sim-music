// pages/login/login.js
import {
  isPhone
} from '../../utils/util'
import {
  phoneLogin
} from '../../apis/login'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo)
      wx.reLaunch({
        url: '/pages/index/index',
      })
  },

  handleInput(event) {
    let id = event.currentTarget.id
    this.setData({
      [id]: event.detail.value
    })
  },

  async login() {
    let {
      phone,
      password
    } = this.data
    if (!phone) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'error'
      })
      return
    }
    if (!isPhone(phone)) {
      wx.showToast({
        title: '手机格式有误',
        icon: 'error'
      })
      return
    }
    if (!password) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'error'
      })
      return
    }

    const res = await phoneLogin({
      phone,
      password
    })
    if (res.code === 200) {
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      })
      wx.setStorageSync('userInfo', JSON.stringify(res.profile))
      wx.setStorageSync('cookie', res.cookie)
      wx.switchTab({
        url: '/pages/index/index',
      })
    } else {
      wx.showToast({
        title: res.msg,
        icon: 'error'
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})