//index.js
//获取应用实例
import request from "../../utils/request";
import {
  login,
  queryUserInfo
} from "../api/api";

const app = getApp();

Page({
  data: {
    motto: "Hello World",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo")
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: "../logs/logs"
    });
  },
  onReady: function() {},
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
        this.postLogin();
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
        }
      });
    }
  },
  // 获取用户信息
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
    this.postLogin();
  },

  // 授权登入
  postLogin: function() {
    wx.login({
      success: function(res) {
        console.log('login', res)
        login({
          code: res.code,
          userInfo: app.globalData.userInfo
        }).then(res => {
          app.globalData.token = res.data.token;
          console.log('login res', res)
          queryUserInfo().then(res => {
            cosnole.log('queryUserInfo res', res)
          })
        });
      }
    })

    // 获取用户信息

    // request.http({
    //   url: "/auth/login_by_weixin",
    //   data: app.globalData.userInfo
    // }).then(res => {
    //   console.log('login res', res)
    // })
  },

  // 跳转页面
  goToMainPage: function() {
    const timer = setTimeout(() => {
      wx.redirectTo({
        url: "/pages/main/main"
      });
    }, 3000);
  }
});