import {
  getProtocol,
  getUserActivityList
} from '../api/api.js'
const app = getApp();
Page({

  data: {
    list: null,
    protocol: '',
    height: 0,
    warpHeight: 0,
    show: false,
    userInfo: null,
  },

  onLoad: function (options) {
    this.setData({
      height: parseInt(wx.getStorageSync('statusBarHeight')) + 10,
      warpHeight: parseInt(wx.getStorageSync('warpHeight')),
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
      this.setData({
        list: res.data.list
      })
      wx.hideLoading()
    })
  },

  goBack: function () {
    wx.navigateBack()
  },

  goToActivityDetail: function (e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/activityDetail/activityDetail?id=${id}&pageType=1`,
    })
  },

  confirm: function () {
    this.setData({
      show: false
    })
  }
})