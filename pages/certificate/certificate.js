import {
  countRpx
} from '../../utils/util.js'
const app = getApp()

Page({


  onLoad: function (options) {
    console.log('options', options)
    let year = new Date().getFullYear()
    let month = new Date().getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let date = new Date().getDate();
    date = date < 10 ? `0${date}` : date;
    this.setData({
      height: parseInt(wx.getStorageSync('statusBarHeight')) + 10,
      warpHeight: wx.getStorageSync('warpHeight') - countRpx(48, wx.getStorageSync('windowWidth')),
      proveNum: options.proveNum || "2019120932098125663",
      prevPage: options.prevPage,
      time: `${year} / ${month} / ${date}`
    });
  },


  onReady: function () {

  },

  // 返回
  goBack: function () {
    wx.reLaunch({
      url: `/pages/main/main?page=${this.data.prevPage}`,
    })
  },
})