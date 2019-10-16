// pages/union/union.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    pageHeight: 0,
    currentTab: "union",
    nowIndex: 0,
    tabs: [{
        key: 'union',
        name: "协会成员",
        active: "active"
      },
      {
        key: 'apply',
        name: "申请列表",
        active: ""
      }
    ],
    peopleList: [{
      type: 'a',
      childs: [1, 2, 3, 4, 5, 6, 7, 8]
    }, {
      type: 'b',
      childs: [1, 2, 3, 4, 5, 6, 7, 8]
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      height: parseInt(wx.getStorageSync('statusBarHeight')) + 10,
      pageHeight: parseInt(wx.getStorageSync('pageHeight'))
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  // 点击tab 切换
  hanldeTab: function(e) {
    const {
      currentTab,
      tabs
    } = this.data;
    if (currentTab === e.currentTarget.dataset['tab']) {
      return false
    } else {
      tabs.forEach(tab => {
        if (tab.key === e.currentTarget.dataset['tab']) {
          tab.active = true;
        } else {
          tab.active = false;
        }
      })
      this.setData({
        tabs: tabs,
        currentTab: e.currentTarget.dataset['tab']
      })
    }
    console.log('this.data', currentTab)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})