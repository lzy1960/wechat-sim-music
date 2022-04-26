import {
  getSongDetail,
} from "../../apis/songDetail"
import PubSub from 'pubsub-js'
import moment from "moment"

const appInstance = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay: false,
    song: {},
    musicId: '',
    curTime: '00:00',
    durationTime: '04:00',
    progress: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let musicId = options.musicId
    this.setData({
      musicId
    })
    this.getSongDetail(musicId)

    if (appInstance.globalData.isMusicPlay && appInstance.globalData.musicId === musicId) {
      this.setData({
        isPlay: true
      })
    }

    // 监听音频的播放和暂停
    this.backgroundAudioManager = wx.getBackgroundAudioManager()
    this.setData({
      progress: this.backgroundAudioManager.currentTime / this.backgroundAudioManager.duration * 100
    })
    this.backgroundAudioManager.onPlay(() => {
      this.changePlayState(true)
      appInstance.globalData.musicId = musicId
    })
    this.backgroundAudioManager.onPause(() => {
      this.changePlayState(false)
    })
    this.backgroundAudioManager.onStop(() => {
      this.changePlayState(false)
    })
    this.backgroundAudioManager.onTimeUpdate(() => {
      let curTime = moment(this.backgroundAudioManager.currentTime * 1000).format('mm:ss')
      let progress = this.backgroundAudioManager.currentTime / this.backgroundAudioManager.duration * 100
      this.setData({
        curTime,
        progress
      })
    })
    this.backgroundAudioManager.onEnded(() => {
      PubSub.publish('switchType', 'next')
    })
  },

  changePlayState(isPlay) {
    this.setData({
      isPlay,
    })
    appInstance.globalData.isMusicPlay = isPlay
  },

  handleMusicPlay() {
    let isPlay = !this.data.isPlay
    let {
      musicId
    } = this.data
    this.musicControl(isPlay, musicId)
  },

  async getSongDetail(musicId) {
    const res = await getSongDetail({
      ids: musicId
    })
    if (res.code === 200) {
      this.setData({
        song: res.songs[0],
        durationTime: moment(res.songs[0].dt).format('mm:ss')
      })
      wx.setNavigationBarTitle({
        title: this.data.song.name,
      })
    }
  },

  async musicControl(isPlay, musicId) {
    if (isPlay) {
      // let musicLinkData = await getSongUrl({
      //   id: musicId
      // })
      // let musicLink = musicLinkData.data[0].url
      let musicLink = `https://music.163.com/song/media/outer/url?id=${musicId}.mp3`
      this.backgroundAudioManager.src = musicLink
      this.backgroundAudioManager.title = this.data.song.name
    } else {
      this.backgroundAudioManager.pause()
    }
  },

  handleSwitch(event) {
    let type = event.currentTarget.id
    console.log(type)
    this.backgroundAudioManager.stop()
    PubSub.subscribe('musicId', (msg, musicId) => {
      console.log(musicId)
      this.setData({
        musicId
      })
      this.getSongDetail(musicId)
      this.musicControl(true, musicId)
      PubSub.unsubscribe('musicId')
    })
    PubSub.publish('switchType', type)
  },

  handleChangeTime(event) {
    let progress = event.detail.value
    console.log(progress)
    console.log(this.backgroundAudioManager.duration)
    this.backgroundAudioManager.seek(progress * this.backgroundAudioManager.duration / 100)
    this.setData({
      progress
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