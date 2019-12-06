import {
  copyText,
  showToast,
  tapedFun
} from '../../utils/util.js'
import {
  getUserOrganList,
  quitOrgan,
  searchOrgan,
  jumpUnion
} from '../api/api.js'
const app = getApp()
Page({
  data: {
    height: 0,
    dataObj: {
      type: '',
      organList: null,
      searchKey: '',
      buttonClicked: false
    }
  },

  onLoad: function(options) {
    this.setData({
      height: wx.getStorageSync('statusBarHeight') + 10,
      userInfo: wx.getStorageSync('userInfo')
    });
    this.getData();
  },

  onReady: function() {},

  goBack: function() {
    wx.navigateBack()
  },

  bindKeyInput: function(e) {
    this.setData({
      searchKey: e.detail.value
    })
  },

  getData: function() {
    let params = {}
    if (this.data.searchKey) {
      params.name = this.data.searchKey
    }
    searchOrgan(params).then(res => {
      this.setData({
        organList: res.data.list
      })
    })
  },

  clickItem: function(e) {
    tapedFun(this)
    const id = e.currentTarget.dataset.id
    const role = e.currentTarget.dataset.role // owner 会长 normal 成员  没有这个字段就是没有加入该协会
    if (role) {
      jumpUnion({
        id: id
      }).then(res => {
        wx.navigateTo({
          url: `/pages/union/union?organizeId=${id}`,
        })
      })
    } else {
      wx.navigateTo({
        url: `/pages/union/union?organizeId=${id}`,
      })
    }
  },

  onSearch: function(e) {
    tapedFun(this)
    this.getData()
  },

  onJoin: function(e) {
    const id = e.currentTarget.dataset.organizeid
    wx.redirectTo({
      url: `/pages/userInfo/userInfo?organizeId=${id}`,
    })
  },

  // 退出协会
  onQuit: function(e) {
    const that = this;
    const id = e.currentTarget.dataset.organizeid
    wx.showModal({
      title: '提示',
      content: '确定退出该协会吗？',
      success(res) {
        if (res.confirm) {
          quitOrgan({
            organizeId: id
          }).then(res => {
            showToast('退出成功！')
            that.getData()
          })
        } else if (res.cancel) {}
      }
    })
  },
})