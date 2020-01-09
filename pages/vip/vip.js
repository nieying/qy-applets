import {
  countRpx
} from '../../utils/util.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    userInfo: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      height: parseInt(wx.getStorageSync('statusBarHeight')) + 10,
      warpHeight: parseInt(wx.getStorageSync('warpHeight') - countRpx(48, wx.getStorageSync('windowWidth'))),
      userInfo: wx.getStorageSync('userInfo')
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  goBack: function () {
    wx.navigateBack()
  },

  goPay: function () {
    console.log(111)
    wx.navigateTo({
      url: '/pages/pay/pay',
    })
  }
})