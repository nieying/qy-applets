import {
  getProtocol,
  getUserActivityList
} from '../api/api.js'
const app = getApp();
Page({

  data: {
    list: null,
    protocol: '',
    show: false,
    userInfo: null,
  },

  onLoad: function (options) {
    this.setData({
      height: parseInt(wx.getStorageSync('statusBarHeight')) + 10,
      pageHeight: parseInt(wx.getStorageSync('pageHeight')),
      userInfo: wx.getStorageSync('userInfo')
    })
  },


  onReady: function () {
    wx.showLoading()
    getProtocol().then(res => {
      this.setData({
        protocol: res.data
      })
    })
    getUserActivityList().then(res => {
      if (res && res.data.list.length > 0) {
        res.data.list.forEach(item => {
          item.startTime = item.startTime.split(' ')[0]
        })
        this.setData({
          list: res.data.list
        })
      }
      wx.hideLoading()
    })
  },

  goBack: function () {
    wx.navigateBack()
  },

  goToActivityDetail: function (e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/activityDetail/activityDetail?activityId=${id}&pageType=1`,
    })
  },

  confirm: function () {
    this.setData({
      show: false
    })
  }
})