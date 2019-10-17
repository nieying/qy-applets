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
    selectDialectIds: [],
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
        selectDialectIds: userDialect.map(d => d.languageId)
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
    let typeIndex = e.currentTarget.dataset.id;
    let dialectIndex = e.target.dataset.id;
    let checkBox = dialectList;
    if (checkBox[typeIndex].childList[dialectIndex].checked) {
      dialectList[typeIndex].childList[dialectIndex].checked = false;
    } else {
      dialectList[typeIndex].childList[dialectIndex].checked = true;
    }

    let checkIds = []
    checkBox.filter((item, index) => {
      item.childList.filter((child, index) => {
        if (child.checked === true) {
          checkIds.push(child.id)
        }
      })
    })

    this.setData({
      dialectList: this.data.dialectList,
      selectDialectIds: checkIds
    })
  },
  // 确定
  confrim: function() {
    createNewDialect(this.data.selectDialectIds).then(res => {
      wx.navigateTo({
        url: '/pages/main/main'
      })
    })
  }
})