import {
  getSearchList
} from "../../apis/search"

// pages/searchList/searchList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keywords: '',
    refreshing: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    const {
      keywords
    } = options
    this.setData({
      keywords
    })
    wx.setNavigationBarTitle({
      title: keywords,
    })
    this.getSearchList()
  },

  async getSearchList() {
    const {
      keywords
    } = this.data
    const res = await getSearchList({
      keywords,
      limit: 10
    })
    if (res.code === 200) {
      this.setData({
        searchList: res.result.songs,
        refreshing: false
      })
    }
  },

  goToSongDetail(event) {
    console.log(event)
    let {
      song,
    } = event.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/songDetail/songDetail?musicId=' + song.id,
    })
  },

  onScrollRefresh() {
    this.getSearchList()
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