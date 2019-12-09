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
    pageHeight: 0,
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
      pageHeight: wx.getStorageSync('pageHeight'),
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
    wx.showLoading()
    let params = {}
    if (this.data.searchKey) {
      params.name = this.data.searchKey
    }
    searchOrgan(params).then(res => {
      wx.hideLoading()
      res && this.setData({
        organList: res.data.list
      })
    })
  },

  clickItem: function(e) {
    console.log('jump====>', e)
    tapedFun(this)
    const {
      id,
      state
    } = e.currentTarget.dataset.item
    if (state === 2) {
      jumpUnion({
        id: id
      }).then(res => {
        wx.setStorageSync('lastOrganize', {
          organizeId: id
        })
        wx.navigateTo({
          url: `/pages/union/union?organizeId=${id}`,
        })
      })
    } else {
      wx.navigateTo({
        url: `/pages/union/union?organizeId=${id}&state=${state}`,
      })
    }
  },

  onSearch: function(e) {
    tapedFun(this)
    this.getData()
  },

  onJoinOrgan: function(e) {
    tapedFun(this)
    const id = e.currentTarget.dataset.item.id
    wx.redirectTo({
      url: `/pages/userInfo/userInfo?organizeId=${id}`,
    })
  },

  onPay: function(e) {
    tapedFun(this)
    const item = e.currentTarget.dataset.item
    wx.setStorageSync('payInfo', JSON.stringify({
      amount: item.amount,
      orderId: item.orderId,
      orderSn: item.orderSn,
    }))
    wx.redirectTo({
      url: `/pages/userInfo/userInfo?organizeId=${item.id}&state=${item.state}`,
    })
  },

  // 退出协会
  onQuit: function(e) {
    const that = this;
    const id = e.currentTarget.dataset.item.id
    wx.showModal({
      title: '提示',
      content: '确定退出该协会吗？',
      success(res) {
        if (res.confirm) {
          quitOrgan({
            organizeId: parseInt(id)
          }).then(res => {
            showToast('退出成功！')
            that.getData()
          })
        } else if (res.cancel) {}
      }
    })
  },
})