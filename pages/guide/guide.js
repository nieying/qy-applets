import { uploadWeChatInfo } from '../api/api'
import { storageHeight } from '../../utils/util'

const app = getApp();

Page({
  data: {
    height: 0,
    warpHeight: 0,
  },

  onLoad: function () {
    this.setData({
      height: parseInt(wx.getStorageSync('statusBarHeight')) + 10,
      warpHeight: parseInt(wx.getStorageSync('warpHeight'))
    })
  },

  goBack: function() {
    wx.navigateBack()
  },

  getAuthorize: function (e) {
    app.aldstat.sendEvent("微信登入", "用户点击了微信登入")
    storageHeight();
    console.log('getAuthorize', e);
    let errMsg = e.detail.errMsg;
    if (errMsg == 'getUserInfo:fail auth deny' || errMsg == 'getUserInfo:fail auth cancel') {
      wx.hideLoading();
      wx.navigateTo({
        url: '/pages/index/index',
      })
      // wx.showToast({
      //   title: '授权失败',
      //   icon: 'none',
      //   duration: 2000
      // });
    } else {
      wx.showLoading({
        title: '正在授权',
        mask: true,
      });
      // 登录
      wx.login({
        success: res => {
          console.log("wx.login", res)
          wx.setStorageSync('loginCode', res.code);
          uploadWeChatInfo()
        }
      })
    }
  }
});