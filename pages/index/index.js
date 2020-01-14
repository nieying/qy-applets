import {
  getStartUp,
} from "../api/api";
const app = getApp();
import {
  storageHeight
} from '../../utils/util'
const times = 2000;
Page({
  data: {
    loading: true,
    startUpObj: null,
  },


  onReady: function() {
    storageHeight(app);
  },

  onLoad: function (options) {
    console.log('startup onLoad', wx.getStorageSync('token'))
    // if (wx.getStorageSync('token')) {
      const lastLanguage = wx.getStorageSync('lastLanguage')
      getStartUp().then(res => {
        if (res && res.data) {
          this.setData({
            startUpObj: res.data,
          })
        }
        this.setData({
          loading: false
        })
        this.goToMainPage();
      })
    
  },

  // 跳转页面
  goToMainPage: function () {
    const timer = setTimeout(() => {
      wx.redirectTo({
        url: "/pages/main/main"
      });
    }, times);
  },

  // 跳转页面
  goToLanguagePage: function () {
    const timer = setTimeout(() => {
      wx.redirectTo({
        url: "/pages/language/language"
      });
    }, times);
  }
})