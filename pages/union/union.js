import {
  getOrganizeDetail,
  getOrganMemberList
} from '../api/api.js'
import {
  tapedFun,
  countRpx,
  showToast
} from '../../utils/util.js'
Page({

  data: {
    height: 0,
    pageHeight: 0,
    currentTab: "activity",
    showAllInfo: true,
    nowIndex: 0,
    organDetail: {},
    tabs: [{
      key: 'activity',
      name: "协会活动",
      active: "active"
    }, {
      key: 'task',
      name: "任务列表",
      active: ""
    }, {
      key: 'union',
      name: "协会成员",
      active: ""
    }],
    memberList: [],
    peddingMemberList: [],
    organizeId: null,
    buttonClicked: false
  },


  onLoad: function(options) {
    this.setData({
      height: parseInt(wx.getStorageSync('statusBarHeight')) + 10,
      pageHeight: parseInt(wx.getStorageSync('pageHeight') - countRpx(40, wx.getStorageSync('windowWidth'))),
      organizeId: options.organizeId,
      prevPage: options.prevPage || 'home'
    })
    this.getOrganDetail(options.organizeId);
  },

  onShow: function() {
    this.getMemberList();
  },

  goBack: function() {
    wx.navigateTo({
      url: `/pages/main/main?page=${this.data.prevPage}`,
    })
    // wx.navigateBack()
  },
  // 获取协会详情
  getOrganDetail: function(id) {
    getOrganizeDetail({
      organizeId: id
    }).then(res => {
      if (res) {
        if (res.data.role === 'owner') {
          this.setData({
            tabs: [{
              key: 'activity',
              name: "协会活动",
              active: "active"
            }, {
              key: 'task',
              name: "任务列表",
              active: ""
            }, {
              key: 'union',
              name: "协会成员",
              active: ""
            }, {
              key: 'apply',
              name: "申请列表",
              active: ""
            }],
            organDetail: res.data
          })
        } else {
          this.setData({
            organDetail: res.data
          })
        }
      }
    })
  },
  // 获取协会成员类表
  getMemberList: function() {
    wx.showLoading()
    const peddingMemberList = [];
    const memberList = [];
    getOrganMemberList({
      organizeId: this.data.organizeId
    }).then(res => {
      if (res && res.data.list.length > 0) {
        res.data.list.filter(r => {
          if (r.state === 1) {
            peddingMemberList.push(r)
          } else {
            memberList.push(r)
          }
        })
        this.setData({
          memberList: memberList,
          peddingMemberList: peddingMemberList,
        })
        wx.hideLoading()
      }
    })
  },

  // 点击tab 切换
  hanldeTab: function(e) {
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
  },

  goSetting: function() {
    tapedFun(this);
    wx.navigateTo({
      url: `/pages/setting/setting?organizeId=${this.data.organizeId}`,
    })
  },
  followTopic: function() {
    tapedFun(this);
    wx.navigateTo({
      url: `/pages/userInfo/userInfo?organizeId=${this.data.organizeId}`,
    })
  },
  onPay: function() {
    tapedFun(this)
    wx.redirectTo({
      url: `/pages/userInfo/userInfo?organizeId=${this.data.organizeId}&state=${this.data.organDetail.state}`,
    })
  },
  goActivity: function() {
    tapedFun(this);
    wx.navigateTo({
      url: `/pages/activity/activity`,
    })
  },

  scroll: function(e) {
    if (e.detail.scrollTop < 2) {
      this.setData({
        showAllInfo: true
      })
    } else {
      this.setData({
        showAllInfo: false
      })
    }
  }
})