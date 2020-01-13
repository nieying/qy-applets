import {
  copyText,
  showToast,
  countRpx,
  tapedFun
} from '../../utils/util.js'
import {
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

  onLoad: function (options) {
    this.setData({
      height: wx.getStorageSync('statusBarHeight') + 10,
      pageHeight: wx.getStorageSync('pageHeight') - countRpx(60, wx.getStorageSync('windowWidth')),
      userInfo: wx.getStorageSync('userInfo')
    });
    this.getData();
  },

  onReady: function () {},

  goBack: function () {
    wx.navigateBack()
  },

  bindKeyInput: function (e) {
    this.setData({
      searchKey: e.detail.value
    })
  },

  getData: function () {
    wx.showLoading()
    let params = {}
    if (this.data.searchKey) {
      params.name = this.data.searchKey
    }
    searchOrgan(params).then(res => {
      wx.hideLoading()
      res && this.setData({
        organList: !wx.getStorageSync('loginCode') && !params.name ? [] : res.data.list
      })
    })
  },

  clickItem: function (e) {
    tapedFun(this)
    const item = e.currentTarget.dataset.item
    if (item.state === 2) {
      jumpUnion({
        id: item.id
      }).then(res => {
        wx.setStorageSync('lastOrganize', {
          organizeId: item.id
        })
        wx.navigateTo({
          url: `/pages/union/union?organizeId=${item.id}`,
        })
      })
    } else {
      if (item.state === 0) {
        wx.setStorageSync('payInfo', JSON.stringify({
          amount: item.amount,
          orderId: item.orderId,
          orderSn: item.orderSn,
        }))
      }
      wx.navigateTo({
        url: `/pages/union/union?organizeId=${item.id}&state=${item.state}`,
      })
    }
  },

  onSearch: function (e) {
    tapedFun(this)
    this.getData()
  },

  onJoinOrgan: function (e) {
    tapedFun(this)
    if (!wx.getStorageSync('loginCode')) {
      wx.navigateTo({
        url: '/pages/guide/guide',
      })
      return
    }
    const id = e.currentTarget.dataset.item.id
    wx.redirectTo({
      url: `/pages/userInfo/userInfo?organizeId=${id}`,
    })
  },

  onPay: function (e) {
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
  onQuit: function (e) {
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

  textPaste: function () {
    copyText('657465669')
  },
})