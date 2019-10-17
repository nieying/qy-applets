import {
  getDialectList,
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
    const userDialect = wx.getStorageSync('userDialect')
    wx.showLoading();
    getDialectList().then(res => {
      const list = res.data.map(({
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
      console.log('getDialectList res', list, userDialect, res)
      this.setData({
        dialectList: list,
        selectDialectIds: userDialect.map(d => d.languageId)
      })
      wx.hideLoading();
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

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
    createNewDialect({
      languageIds: this.data.selectDialectIds
    }).then(res => {
      console.log('createNewDialect res', res)
    })
  }
})