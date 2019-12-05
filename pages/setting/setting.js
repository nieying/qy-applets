import {
  joinOrganize
} from '../api/api.js'
const app = getApp()
Page({

  data: {
    height: 0,
    dataObj: {
      type: '',
      organList: []
    },
    show: false
  },

  onLoad: function(options) {
    this.setData({
      height: wx.getStorageSync('statusBarHeight') + 10,
      organList: wx.getStorageSync('seachOrganList'),
      organizeId: options.organizeId
    })
  },

  onReady: function() {},

  goBack: function() {
    wx.navigateBack()
  },
  goSearch: function() {
    wx.redirectTo({
      url: '/pages/search/search',
    })
  },
  showModal: function() {
    this.setData({
      show: true
    })
  }
})