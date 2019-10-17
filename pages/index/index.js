import {
  getStartUp,
} from "../api/api";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startUpObj: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (wx.getStorageSync('token')) {
      getStartUp().then(res => {
        this.setData({
          startUpObj: res.data
        })
        console.log('getStartUp res', res);
        this.goToMainPage();
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // this.goToMainPage();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  // 跳转页面
  goToMainPage: function() {
    const timer = setTimeout(() => {
      wx.redirectTo({
        url: "/pages/main/main"
      });
    }, 3000);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})