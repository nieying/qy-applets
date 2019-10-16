import {
  copyText
} from '../../utils/util.js'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    dataObj: {
      type: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      height: wx.getStorageSync('statusBarHeight') + 10
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  textPaste: function() {
    copyText('test20076')
  },

  goBack: function() {
    wx.navigateBack()
  },
})