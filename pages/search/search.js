import {
  getDefault,
  getHotList,
  getSearchSuggest
} from "../../apis/search"
import {
  debounce
} from "../../utils/util"

// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholder: '',
    realPlaceholder: '',
    hotList: [],
    searchContent: '',
    suggestList: [],
    historyList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getDefault()
    this.getHotList()
    this.getHistoryList()
  },

  getHistoryList() {
    let historyList = wx.getStorageSync('historyList')
    if (historyList) {
      this.setData({
        historyList
      })
    }
  },

  async getDefault() {
    const res = await getDefault()
    if (res.code === 200) {
      this.setData({
        placeholder: res.data.showKeyword,
        realPlaceholder: res.data.realkeyword
      })
    }
  },

  async getHotList() {
    const res = await getHotList()
    if (res.code === 200) {
      this.setData({
        placeholder: res.data.showKeyword,
        hotList: res.data
      })
    }
  },

  async getSearchSuggest(keywords) {
    const res = await getSearchSuggest({
      keywords,
      type: 'mobile'
    })
    if (res.code === 200) {
      this.setData({
        suggestList: res.result.allMatch
      })
    }
  },

  handleInputChange(event) {
    this.setData({
      searchContent: event.detail.value.trim()
    })
    debounce(() => {
      this.getSearchSuggest(this.data.searchContent)
    }, 200)
  },

  handleClearInput() {
    console.log('清空')
    this.setData({
      searchContent: '',
      suggestList: []
    })
  },

  handleClearHistoryList() {
    wx.showModal({
      title: '确定清空全部历史记录？',
      confirmText: '清空',
      confirmColor: '#5bc29a',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorageSync('historyList')
          this.setData({
            historyList: []
          })
        }
      }
    })
  },

  goToSearchList(keywords) {
    const {
      realPlaceholder
    } = this.data
    this.setHistoryList(keywords || realPlaceholder)
    wx.navigateTo({
      url: '/pages/searchList/searchList?keywords=' + (keywords || realPlaceholder),
    })
  },

  setHistoryList(text) {
    let {
      historyList
    } = this.data
    if (!text) return
    const findIndex = historyList.indexOf(text)
    if (findIndex > -1) {
      historyList.splice(findIndex, 1)
    }
    historyList.unshift(text)
    this.setData({
      historyList
    })
    wx.setStorageSync('historyList', historyList)
  },

  setKeywords(event) {
    const keywords = event.currentTarget.dataset.keywords
    this.setData({
      keywords
    })
    this.goToSearchList(keywords)
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