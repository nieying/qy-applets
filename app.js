import {
  uploadWeChatInfo
} from "./pages/api/api";
import {
  storageHeight
} from './utils/util'
const app = getApp();
const ald = require('./utils/ald-stat.js')
App({
  onLaunch: function () {

    // wx.loadFontFace({
    //   family: 'FZSuXSLSJW',
    //   source: 'url("https://at.alicdn.com/t/webfont_dow0253tmlt.ttf")',
    //   success: res => {
    //     console.log('font load success', res)
    //   },
    //   fail: err => {
    //     console.log('font load fail', err)
    //   }
    // })
    

    storageHeight(app);
    // 判断网络是否正常
    wx.onNetworkStatusChange(function (res) {
      if (res.isConnected == false) { // res.isConnected false无网络  res.networkType wifi
        wx.showModal({
          title: '网络错误',
          content: '网络连接失败，请检查网络',
          confirmText: '知道了',
          mask: true,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.redirectTo({ //路由跳转
                url: '/pages/index/index'
              });
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        });
      }
    });

    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log('是否授权', res.authSetting['scope.userInfo'])
        if (res.authSetting['scope.userInfo']) {
          console.log(1111)
          uploadWeChatInfo();
        } else {
          wx.reLaunch({
            url: "/pages/guide/guide"
          });
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    token: null,
  }
})