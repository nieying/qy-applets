import {
  getOrganizeDetail,
  getOrganMemberList
} from '../api/api.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    pageHeight: 0,
    currentTab: "union",
    nowIndex: 0,
    organDetail: {},
    tabs: [{
        key: 'union',
        name: "协会成员",
        active: "active"
      },
      {
        key: 'apply',
        name: "申请列表",
        active: ""
      }
    ],
    memberList: [],
    peddingMemberList: [],
    userType: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      height: parseInt(wx.getStorageSync('statusBarHeight')) + 10,
      pageHeight: parseInt(wx.getStorageSync('pageHeight')),
      userType: options.userType
    })
    if (options.userType === "leader") {
      this.setData({
        tabs: [{
            key: 'union',
            name: "协会成员",
            active: "active"
          },
          {
            key: 'apply',
            name: "申请列表",
            active: ""
          }
        ]
      })
    } else {
      this.setData({
        tabs: [{
          key: 'union',
          name: "协会成员",
          active: "active"
        }]
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getOrganDetail();
    this.getMemberList();
  },
  goBack: function() {
    wx.navigateBack()
  },
  // 获取协会详情
  getOrganDetail: function() {
    getOrganizeDetail().then(res => {
      this.setData({
        organDetail: res.data
      })
    })
  },
  // 获取协会成员类表
  getMemberList: function() {
    debugger
    wx.showLoading()
    const peddingMemberList = [];
    const memberList = [];
    getOrganMemberList({
      page: 1,
      limit: 1000
    }).then(res => {
      res.data.list.filter(r => {
        if (r.state === 1) {
          r.addTime = Date.parse(r.addTime)
          peddingMemberList.push(r)
        } else {
          r.addTime = Date.parse(r.addTime)
          memberList.push(r)
        }
        peddingMemberList.push({
          "organizeId": 4,
          "role": "normal",
          "addTime": "2019-10-28T14:10:14.000+0000",
          "level": "1",
          "id": 23,
          "avatar": "https://wx.qlogo.cn/mmopen/vi_32/NmicV4kT5uPxJicThleAtQMj6dIJR2w435GC2txkYyMS4ACdQwQfiaViamrIpkYoDlRico20epibuOXHHoIEThFNpqBw/132",
          "state": 2,
          "sort": 23,
          "userName": "\uD83C\uDF2A",
          "type": "normal",
          "userId": 12
        })
      })
      this.setData({
        memberList: memberList,
        peddingMemberList: peddingMemberList,
      })
      wx.hideLoading()
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
  }
})