import {
  joinOrganize
} from '../api/api.js'
import {
  showToast,
  tapedFun
} from '../../utils/util.js'
const app = getApp()
Page({

  data: {
    height: 0,
    buttonClicked: false

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

  onSubmit: function () {
    // wx.showToast({
    //   icon: 'none',
    //   title: '该功能未完善',
    // })
    tapedFun(this)
  }
  
})