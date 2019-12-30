import {
  copyText,
} from '../../utils/util.js'
import {
  joinOrganize
} from '../api/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    dataObj: {
      type: '',
      organList: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      height: wx.getStorageSync('statusBarHeight') + 10,
      organList: wx.getStorageSync('seachOrganList')
    })
  },


  // 复制
  textPaste() {
    copyText('657465669')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log('===>', this.data.organList)
  },

  goBack: function() {
    wx.navigateBack()
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
              icon:'',
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