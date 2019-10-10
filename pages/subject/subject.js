const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    isLoading: false,
    type: 3,
    correct: false,
    answerList: [{
        value: '北京'
      },
      {
        value: '广州'
      },
      {
        value: '上海'
      },
      {
        value: '沈阳'
      }
    ],
    selectAnswer: [],
    isAnswered: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      height: app.globalData.height
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  goBack: function() {
    wx.navigateBack()
  },


  //单选
  getradio: function(e) {
    let index = e.currentTarget.dataset.id;
    let radio = this.data.answerList;
    for (let i = 0; i < radio.length; i++) {
      this.data.answerList[i].checked = false;
    }
    if (radio[index].checked) {
      this.data.answerList[index].checked = false;
    } else {
      this.data.answerList[index].checked = true;
    }
    let userRadio = radio.filter((item, index) => {
      return item.checked == true;
    })
    this.setData({
      answerList: this.data.answerList,
      selectAnswer: userRadio
    })
  },

  // 提交
  submit: function(e) {
    this.setData({
      correct: true,
      isAnswered: true,
    })
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