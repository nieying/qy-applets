// pages/main/main.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    nowPage: "homePage",
    nowIndex: 0,
    tabBar: [{
        src: "/pages/images/main/icon-home",
        text: "主页",
        tapFunction: "toHomePage",
        active: "active"
      },
      {
        src: "/pages/images/main/icon-activity",
        text: "活动",
        tapFunction: "toActivityPage",
        active: ""
      },
      {
        src: "/pages/images/main/icon-my",
        text: "我的",
        tapFunction: "toMyPage",
        active: ""
      }
    ],
  },

  toHomePage() {
    this.setData({
      nowPage: "homePage",
      nowIndex: 0
    });
  },
  toActivityPage() {
    this.setData({
      nowPage: "activityPage",
      nowIndex: 1
    });
  },
  toMyPage() {
    this.setData({
      nowPage: "myPage",
      nowIndex: 2
    });
  },

  onLoad: function(options) {
  },

  onReady: function() {
  },
});