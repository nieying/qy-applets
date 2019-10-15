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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});