import {
  copyText
} from '../../utils/util.js'
const app = getApp()
Page({

  data: {
    height: 0,
    pageHeight: 0,
    dataObj: {
      type: '',
      organList: []
    },
    show: false
  },

  onLoad: function (options) {
    this.setData({
      height: wx.getStorageSync('statusBarHeight') + 10,
      pageHeight: wx.getStorageSync('pageHeight'),
      organList: wx.getStorageSync('seachOrganList'),
      organizeId: options.organizeId
    })
  },

  onReady: function () {},

  goBack: function () {
    wx.navigateBack()
  },
  goSearch: function () {
    wx.redirectTo({
      url: '/pages/search/search',
    })
  },
  textPaste: function () {
    copyText('657465669')
  },
  showModal: function () {
    this.setData({
      show: true
    })
  }
})