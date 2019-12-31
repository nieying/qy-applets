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
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // wx.getUserInfo({
          //   success: res => {
          //     // 可以将 res 发送给后台解码出 unionId
          //     this.globalData.userInfo = res.userInfo

          //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          //     // 所以此处加入 callback 以防止这种情况
          //     if (this.userInfoReadyCallback) {
          //       this.userInfoReadyCallback(res)
          //     }
          //   }
          // })
          uploadWeChatInfo()
          console.log(1111)
        } else {
          console.log(2222)
          wx.redirectTo({
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