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
      organList: wx.getStorageSync('seachOrganList')
    })
  },


  onReady: function() {},

  goBack: function() {
    wx.navigateBack()
  },

  showModal: function() {
    this.setData({
      show: true
    })
  }
})