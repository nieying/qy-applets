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
    console.log('act details', options)
    this.setData({
      height: parseInt(wx.getStorageSync('statusBarHeight')) + 10,
      warpHeight: parseInt( options.pageType ? wx.getStorageSync('warpHeight') : wx.getStorageSync('pageHeight')),
      activityId: options.activityId,
      organizeId: options.organizeId,
      pageType: options.pageType
    })
    wx.showLoading()
    getActivityDetail({
      activityId: options.activityId
    }).then(res => {
      console.log('getActivityDetail res', res)
      this.setData({
        actObj: res.data
      })
      wx.hideLoading()
    })
  },


  onReady: function() {

  },

  goBack: function() {
    wx.navigateBack()
  },

  goApplyAct: function() {
    wx.navigateTo({
      url: `/pages/applyAct/applyAct?activityId=${this.data.activityId}`
    })
  },

  onShareAppMessage: function() {

  }
})