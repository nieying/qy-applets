import {
  editMember
} from '../api/api.js'
import {
  showToast,
} from '../../utils/util.js'
const app = getApp()
Page({

  data: {
    height: 0,
    showTag: false,
    currentUser: {},
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
      },
      {
        id: 15,
        name: '会员',
        checked: false
      }
    ]
  },

  onLoad: function(options) {
    this.setData({
      height: wx.getStorageSync('statusBarHeight') + 10,
      warpHeight: parseInt(wx.getStorageSync('pageHeight')) + 10,
      memberId: options.memberId,
      organizeId: options.organizeId,
      showTag: options.type && options.type === 'tag'
    })
    const tags = this.data.tags;
    if (options.rank) {
      tags.forEach(tag => {
        if (tag.name === options.rank) {
          tag.checked = true
        } else {
          tag.checked = false
        }
      })
    }
    this.setData({
      tags
    })
    if (!options.type) {
      this.setData({
        currentUser: JSON.parse(wx.getStorageSync('user'))
      })
    }
  },

  onReady: function() {},

  goBack: function() {
    wx.navigateBack();
    // wx.redirectTo({
    //   url: `/pages/union/union?organizeId=${this.data.organizeId}`,
    // })
  },

  updateMemeber: function(remark) {
    editMember({
      memberId: this.data.memberId,
      organizeId: this.data.organizeId,
      rank: remark
    }).then(res => {
      showToast("设置成功");
    })
  },

  toggleSwitch: function(e) {
    const id = e.currentTarget.dataset.id;
    const tags = this.data.tags;
    tags.forEach(tag => {
      if (tag.id === id) {
        tag.checked = true
        this.updateMemeber(tag.name)
        // this.setData({
        //   remark: tag.name
        // })
      } else {
        tag.checked = false
      }
    })
    this.setData({
      tags
    })
  }
})