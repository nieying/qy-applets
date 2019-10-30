import {
  copyText
} from '../../utils/util.js'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    dataObj: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      height: wx.getStorageSync('statusBarHeight') + 10,
    })
    if (option.userType === 'rejected') {
      this.setData({
        dataObj: {
          icon:'clear',
          color:'#F44336',
          title:'请求没有被通过',
          tips:'请与客服联系询问原因'
        }
      })
    } else {
      this.setData({
        dataObj: {
          icon: 'success',
          color: '#F44336',
          title: '审核中...',
          tips: '请耐心等待审核'
        }
      })
    }
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  textPaste: function() {
    copyText('test20076')
  },

  goBack: function() {
    wx.navigateBack()
  },
})