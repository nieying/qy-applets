import {
  copyText,
  showToast,
  tapedFun
} from '../../utils/util.js'
import {
  joinOrganize,
  searchOrgan
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
      // organList: wx.getStorageSync('seachOrganList')
    })
  },

  onReady: function() {
    console.log('===>', this.data.organList)
  },

  goBack: function() {
    wx.navigateBack()
  },

  bindKeyInput: function(e) {
    this.setData({
      searchKey: e.detail.value
    })
  },

  onSearch: function(e) {
    tapedFun(this)
    // 查询协会列表
    searchOrgan({
      name: this.data.searchKey
    }).then(res => {
      this.setData({
        organList: res.data.list
      })
    })
  },

  clickItem: function(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: "提示",
      content: `是否加入该协会`,
      success(res) {
        if (res.confirm) {
          joinOrganize({
            organizeId: id
          }).then(res => {
            wx.showToast({
              icon: '',
              title: '申请已提交，待会长审核',
            })
            // wx.navigateTo({
            //   url: '/pages/applyFeedback/applyFeedback?type=1',
            // })
          })
        } else if (res.cancel) {}
      }
    });
  }
})