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
  onLoad: function(options) {
    this.setData({
      height: parseInt(wx.getStorageSync('statusBarHeight')) + 10,
      warpHeight: parseInt(wx.getStorageSync('warpHeight')),
      userInfo: wx.getStorageSync('userInfo')
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

  goPay: function() {
    wx.navigateTo({
      url: '/pages/pay/pay',
    })
  }
})