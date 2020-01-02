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
                url: '/pages/startup/startup'
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
          uploadWeChatInfo();
          console.log(1111)
        } else {
          console.log(2222)
          // todo
          wx.reLaunch({
            url: "/pages/guide/guide"
          });
          console.log(333)
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    token: null,
  }
})