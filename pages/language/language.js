import {
  getDialectList,
  getUserDialectList,
  createNewDialect
} from '../api/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    warpHeight: 0,
    dialectList: [],
    selectDialects: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData();
    this.setData({
      height: parseInt(wx.getStorageSync('statusBarHeight')) + 10,
      warpHeight: parseInt(wx.getStorageSync('warpHeight'))
    })
  },

  // 获取数据
  getData: function() {
    wx.showLoading();
    getDialectList().then(res => {
      getUserDialectList().then(dialect => {
        this.dealDialectData(res.data, dialect.data)
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  // 判断用户是否学习过方言
  dealDialectData: function(dailectList, userDialect) {
    if (userDialect && userDialect.length > 0) {
      const list = dailectList.map(({
        childList,
        ...item
      }) => {
        return {
          ...item,
          childList: childList.map(itemCl => ({
            ...itemCl,
            checked: userDialect.some(itemB => itemB.languageId === itemCl.id)
          }))
        }
      })
      this.setData({
        dialectList: list,
        selectDialects: userDialect
      })
    } else {
      dailectList.forEach(d => {
        d.childList.forEach(c => {
          return c.checked = false;
        })
      })
      this.setData({
        dialectList: dailectList
      })
    }
    wx.hideLoading();
  },

  // 返回
  goBack: function() {
    wx.navigateBack()
  },

  //多选
  userCheck: function(e) {
    const {
      dialectList
    } = this.data;
    let state = e.target.dataset.state;
    if (!state) {
      wx.showToast({
        icon:'none',
        title: '暂未开放,敬请等待！',
      })
      return
    }
    let typeIndex = e.currentTarget.dataset.id;
    let dialectIndex = e.target.dataset.id;
    let checkBox = dialectList;
    if (checkBox[typeIndex].childList[dialectIndex].checked) {
      dialectList[typeIndex].childList[dialectIndex].checked = false;
    } else {
      dialectList[typeIndex].childList[dialectIndex].checked = true;
    }

    let checks = []
    checkBox.filter((item, index) => {
      checks = item.childList.filter((child, index) => {
        return child.checked === true
      })
    })

    this.setData({
      dialectList: this.data.dialectList,
      selectDialects: checks
    })
  },
  // 确定
  confrim: function() {
    const { selectDialects } = this.data
    if (selectDialects.length  === 0){
      wx.showToast({
        icon:'none',
        title: '请选择您要学习的方言',
      })
      return;
    }
    const lastLanguage = wx.getStorageSync('lastLanguage');
    if (!lastLanguage.hasOwnProperty('id')) {
      wx.setStorageSync('lastLanguage', selectDialects[0])
    } 
    const ids = selectDialects.map(d => d.id)
    createNewDialect(ids).then(res => {
      wx.navigateTo({
        url: '/pages/main/main'
      })
    })
  }
})