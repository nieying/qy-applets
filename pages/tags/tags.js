import {
  joinOrganize
} from '../api/api.js'
const app = getApp()
Page({

  data: {
    height: 0,
    show: false,
    tags: [{
        name: '外联部部长',
        checked: false
      },
      {
        name: '外联部部长1',
        checked: false
      },
      {
        name: '外联部部长2',
        checked: false
      },
      {
        name: '外联部部长3',
        checked: true
      }
    ]
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

  switchChange: function(e) {
    console.log(e.detail.value)
  }
})