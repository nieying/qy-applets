import { uploadWeChatInfo } from '../api/api'
import { storageHeight } from '../../utils/util'

const app = getApp();

Page({
  data: {

  },

  onLoad: function () {

  },

  getAuthorize: function (e) {
    storageHeight();
    console.log('getAuthorize', e);
    let errMsg = e.detail.errMsg;
    if (errMsg == 'getUserInfo:fail auth deny' || errMsg == 'getUserInfo:fail auth cancel') {
      wx.hideLoading();
      wx.showToast({
        title: '授权失败',
        icon: 'none',
        duration: 2000
      });
    } else {
      wx.showLoading({
        title: '正在授权',
        mask: true,
      });
      // 登录
      wx.login({
        success: res => {
          wx.setStorageSync('loginCode', res.code);
          uploadWeChatInfo()
        }
      })
    }
  }
});