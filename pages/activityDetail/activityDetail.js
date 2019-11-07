const app = getApp();
import {
  getActivityDetail
} from '../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    warpHeight: 0,
    actObj: {},
    showSkeleton: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      height: parseInt(wx.getStorageSync('statusBarHeight')) + 10,
      warpHeight: parseInt(wx.getStorageSync('warpHeight'))
    })
    wx.showLoading()
    getActivityDetail({
      activityId: options.id
    }).then(res => {
      console.log('getActivityDetail res', res)
      this.setData({
        actObj: res.data
      })
      wx.hideLoading()
      // setTimeout(() => {
      //   this.setData({
      //     showSkeleton: false
      //   })
      // }, 1000)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  goBack: function() {
    wx.navigateBack()
  },

  goBaidu: function() {
    wx.navigateTo({
      url: '/pages/out/out'
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})