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
    console.log('startup onLoad', wx.getStorageSync('token'))
    if (wx.getStorageSync('token')) {
      if (wx.getStorageSync('lastLanguage') && wx.getStorageSync('lastLanguage').hasOwnProperty('languageId')) {
        getStartUp().then(res => {
          this.setData({
            startUpObj: res.data
          })
          console.log('getStartUp res', res);
          this.goToMainPage();
        })
      } else {
        this.goToLanguagePage();
      }
    } else {
      wx.redirectTo({
        url: "/pages/guide/guide"
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // this.goToMainPage();
  },

  // 跳转页面
  goToMainPage: function() {
    const timer = setTimeout(() => {
      wx.redirectTo({
        url: "/pages/main/main"
      });
    }, 3000);
  },

  // 跳转页面
  goToLanguagePage: function() {
    const timer = setTimeout(() => {
      wx.redirectTo({
        url: "/pages/language/language"
      });
    }, 3000);
  }
})