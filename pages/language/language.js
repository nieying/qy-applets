const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    dialectList: [{
        type: '南方',
        list: [{
            id: '1',
            value: '四川'
          },
          {
            id: '2',
            value: '东北'
          },
          {
            id: '3',
            value: '粤语'
          },
          {
            id: '4',
            value: '江西'
          },
        ]
      },
      {
        type: '北方',
        list: [{
            id: '5',
            value: '四川'
          },
          {
            id: '6',
            value: '东北'
          },
          {
            id: '7',
            value: '粤语'
          },
          {
            id: '8',
            value: '江西'
          },
        ]
      }

    ]
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

  //多选
  userCheck: function(e) {
    let typeId = e.currentTarget.dataset.id;
    let dialectId = e.target.dataset.id;
    let checkBox = this.data.dialectList;
    if (checkBox[typeId].list[dialectId].checked) {
      this.data.dialectList[typeId].list[dialectId].checked = false;
    } else {
      this.data.dialectList[typeId].list[dialectId].checked = true;
    }
    this.setData({
      dialectList: this.data.dialectList
    })

    //返回用户选中的值
    let value = checkBox.filter((item, index) => {
      item.list.filter((child, index) => {
        return child.checked == true;
      })
    })
    console.log('checkBox value', value)
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