import {
  joinOrganize
} from '../api/api.js'
const app = getApp()
Page({

  data: {
    height: 0,
    tags: [{
        id: 1,
        name: '会长',
        checked: true
      },
      {
        id: 2,
        name: '副会长',
        checked: false
      },
      {
        id: 3,
        name: '秘书长',
        checked: false
      },
      {
        id: 4,
        name: '副秘书长',
        checked: false
      },
      {
        id: 5,
        name: '宣传部部长',
        checked: false
      },
      {
        id: 6,
        name: '宣传部副部长',
        checked: false
      },
      {
        id: 7,
        name: '组织部部长',
        checked: false
      },
      {
        id: 8,
        name: '组织部副部长',
        checked: false
      },
      {
        id: 9,
        name: '外联部部长',
        checked: false
      },
      {
        id: 10,
        name: '外联部副部长',
        checked: false
      },
      {
        id: 11,
        name: '技术部部长',
        checked: false
      },
      {
        id: 12,
        name: '技术部副部长',
        checked: false
      },
      {
        id: 13,
        name: '传承部部长',
        checked: false
      },
      {
        id: 14,
        name: '传承部副部长',
        checked: false
      }
    ]
  },

  onLoad: function(options) {
    this.setData({
      height: wx.getStorageSync('statusBarHeight') + 10,
      warpHeight: parseInt(wx.getStorageSync('pageHeight')),
      organList: wx.getStorageSync('seachOrganList')
    })
  },

  onReady: function() {},

  goBack: function() {
    wx.navigateBack()
  },

  toggleSwitch: function(e) {
    const id = e.currentTarget.dataset.id;
    const tags = this.data.tags;
    tags.forEach(tag => {
      if (tag.id === id) {
        tag.checked = true
      } else {
        tag.checked = false
      }
    })
    this.setData({
      tags
    })
  }
})