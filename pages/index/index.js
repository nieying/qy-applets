import {
  getStartUp,
} from "../api/api";
const app = getApp();
const times = 2000;
Page({
  data: {
    startUpObj: null,
  },

  onLoad: function(options) {
    console.log('startup onLoad', wx.getStorageSync('token'))
    if (wx.getStorageSync('token')) {
      const lastLanguage = wx.getStorageSync('lastLanguage')
      getStartUp().then(res => {
        if(res) {
          this.setData({
            startUpObj: res.data
          })
        } else {
          this.setData({
            startUpObj: {}
          })
        }
        if (lastLanguage.hasOwnProperty('id')) {
          this.goToMainPage();
        } else {
          this.goToLanguagePage();
        }
      })
    } else {
      wx.redirectTo({
        url: "/pages/guide/guide"
      });
    }
  },

  onReady: function() {
    // this.goToMainPage();
  },

  // 跳转页面
  goToMainPage: function() {
    const timer = setTimeout(() => {
      wx.redirectTo({
        url: "/pages/main/main"
      });
    }, times);
  },

  // 跳转页面
  goToLanguagePage: function() {
    const timer = setTimeout(() => {
      wx.redirectTo({
        url: "/pages/language/language"
      });
    }, times);
  }
})