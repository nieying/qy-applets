import {
  joinOrganize
} from '../api/api.js'
import {
  showToast,
  tapedFun
} from '../../utils/util.js'
const app = getApp()
Page({

  data: {
    height: 0,
    buttonClicked: false,
    tabs: [{
      key: 'worker',
      name: "我是在职",
      active: "active"
    }, {
      key: 'student',
      name: "我是学生",
      active: ""
    }]
  },

  onLoad: function(options) {
    this.setData({
      height: wx.getStorageSync('statusBarHeight') + 10,
      organList: wx.getStorageSync('seachOrganList')
    })
  },

  onReady: function() {},

  goBack: function() {
    wx.navigateBack()
  },

  onSubmit: function() {
    // wx.showToast({
    //   icon: 'none',
    //   title: '该功能未完善',
    // })
    tapedFun(this)
  },
  // 点击tab 切换
  hanldeTab: function (e) {
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
  }

})