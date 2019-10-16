import {
  getDialectList,
  createNewDialect
} from '../api/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    warpHeight: 0,
    dialectList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
    this.setData({
      height: parseInt(wx.getStorageSync('statusBarHeight')) + 10,
      warpHeight: parseInt(wx.getStorageSync('warpHeight'))
    })
  },

  // 获取数据
  getData: function () {
    wx.showLoading();
    getDialectList().then(res => {
      res.data.forEach(r => {
        r.childList.filter(child => {
          child.checked = false;
        })
      });
      console.log('getDialectList res', res)
      this.setData({
        dialectList: res.data
      })
      wx.hideLoading();
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  goBack: function () {
    wx.navigateBack()
  },

  //多选
  userCheck: function (e) {
    const { dialectList } = this.data;
    let typeIndex = e.currentTarget.dataset.id;
    let dialectIndex = e.target.dataset.id;
    let checkBox = dialectList;
    if (checkBox[typeIndex].childList[dialectIndex].checked) {
      dialectList[typeIndex].childList[dialectIndex].checked = false;
    } else {
      dialectList[typeIndex].childList[dialectIndex].checked = true;
    }
    
    this.setData({
      dialectList: this.data.dialectList
    })

    //返回用户选中的值
    let checkIds = []
    checkBox.filter((item, index) => {
      item.childList.filter((child, index) => {
        if (child.checked === true) {
          checkIds.push(child.id)
        }
      })
    })
    console.log('checkBox value', checkIds)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})