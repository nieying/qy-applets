import {
  getDialectList,
  getUserDialectList,
  createNewDialect
} from '../api/api.js'
import {
  showToast,
  tapedFun,
  countRpx
} from '../../utils/util.js'
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
    isSelect: false,
    buttonClicked: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
    this.setData({
      height: parseInt(wx.getStorageSync('statusBarHeight')) + 10,
      warpHeight: parseInt(wx.getStorageSync('warpHeight') - countRpx(48, wx.getStorageSync('windowWidth')))
    })
  },

  // 获取数据
  getData: function () {
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
  onReady: function () {

  },
  // 判断用户是否学习过方言
  dealDialectData: function (dailectList, userDialect) {
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
  goBack: function () {
    wx.navigateBack()
  },

  //多选
  userCheck: function (e) {
    const {
      dialectList
    } = this.data;
    let state = e.target.dataset.state;
    if (state !== undefined) {
      if (!state) {
        showToast('暂未开放,敬请等待！')
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
        item.childList.filter(child => {
          if (child.checked) {
            checks.push(child)
          }
        })
      })
      this.setData({
        dialectList: this.data.dialectList,
        selectDialects: checks,
        isSelect: true
      })
    }
  },
  // 确定
  confrim: function () {
    tapedFun(this)
    const {
      isSelect,
      selectDialects
    } = this.data
    if (selectDialects.length === 0) {
      showToast('请选择您要学习的方言')
      return;
    }
    const lastLanguage = wx.getStorageSync('lastLanguage');
    if (!lastLanguage.hasOwnProperty('id')) {
      wx.setStorageSync('lastLanguage', selectDialects[0])
    }
    let ids = []
    if (isSelect) {
      ids = selectDialects.map(d => d.id)
    } else {
      ids = selectDialects.map(d => d.languageId)
    }
    createNewDialect(ids).then(res => {
      wx.navigateTo({
        url: '/pages/main/main'
      })
    })
  }
})