import {
  getBanner,
  getRecommend,
  getTopList,
  getPlaylistDetail
} from '../../apis/index'
import {
  getDefault
} from '../../apis/search'

// pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    recommendList: [],
    topList: [],
    placeholder: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const bannerData = await getBanner({
      type: 1
    })
    this.setData({
      bannerList: bannerData.banners
    })

    this.getDefault()

    // 推荐歌单
    const recommendData = await getRecommend({
      limit: 10
    })
    this.setData({
      recommendList: recommendData.result
    })

    // 排行榜
    const topData = await getTopList()
    console.log(topData)
    this.setData({
      topList: topData.list.slice(0, 6)
    })

    let requests = []
    for (let item of this.data.topList) {
      const topDetail = getPlaylistDetail({
        id: item.id
      })
      requests.push(topDetail)
    }
    Promise.allSettled(requests).then((values) => {
      values.forEach(({
        value
      }, index) => {
        this.data.topList[index].playlist = value.playlist.tracks.slice(0, 3) || []
        console.log(this.data.topList)
        this.setData({
          topList: topData.list.slice(0, 6)
        })
      })
    })
  },
  async getDefault() {
    const res = await getDefault()
    if (res.code === 200) {
      this.setData({
        placeholder: res.data.showKeyword
      })
    }
  },

  goToRecommendSong() {
    wx.navigateTo({
      url: '/pages/recommendSong/recommendSong',
    })
  },

  goToSearch() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
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