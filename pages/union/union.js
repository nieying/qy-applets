import {
  getOrganizeDetail,
  getOrganMemberList
} from '../api/api.js'
import {getSpell} from '../../utils/util'
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
    peopleList: [{
      type: 'a',
      childs: [1, 2, 3, 4, 5, 6, 7, 8]
    }, {
      type: 'b',
      childs: [1, 2, 3, 4, 5, 6, 7, 8]
    }],
    memberList: [],
    peddingMemberList: [],
    userType: null
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
    this.getMemberList()
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
    wx.showLoading()
    const peddingMemberList = [];
    const memberList = [];
    getOrganMemberList({
      page: 1,
      limit: 1000
    }).then(res => {
      // this.dealData(res.data.list)
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
    })
  },

  dealData(arr) {
    var someTtitle = null;
    var someArr = [];
    for (var i = 0; i < arr.length; i++) {
      var newBrands = { id: arr[i].id, name: arr[i].userName };
      if (arr[i].initial != someTtitle) {
        someTtitle = arr[i].initial
        var newObj = {
          id: i,
          region: someTtitle,
          brands: []
        };
        someArr.push(newObj)
      }
    console.log('newObj===>', newBrands)
      newObj.brands.push(newBrands);
    };

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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
})