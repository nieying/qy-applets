// pages/pay/pay.js
import {
  getPay
} from '../api/api.js'
import {
  showToast,
  tapedFun
} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    totalBill: 0,
    moneyList: [{
        value: 6.3,
        value1: 5,
        checked: true
      },
      {
        value: 15.0,
        value1: 12,
        checked: false
      },
      {
        value: 31.3,
        value1: 25,
        checked: false
      },
      {
        value: 62.2,
        value1: 55,
        checked: false
      },
      {
        value: 135.6,
        value1: 120,
        checked: false
      },
      {
        value: 282.5,
        value1: 250,
        checked: false
      },
    ],
    currentMoney: {
      value: 6.3,
      checked: true
    },
    buttonClicked: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      height: parseInt(wx.getStorageSync('statusBarHeight')) + 10,
      warpHeight: parseInt(wx.getStorageSync('warpHeight')),
    })
  },

  selectMoney: function (e) {
    const {
      moneyList
    } = this.data
    let index = e.currentTarget.dataset.index; //获取用户当前选中的索引值
    let checkBox = moneyList;
    checkBox.forEach(d => {
      d.checked = false;
    });
    if (checkBox[index].checked) {
      moneyList[index].checked = false;
    } else {
      moneyList[index].checked = true;
    }
    //返回用户选中的值
    let value = checkBox.filter((item, index) => {
      return item.checked == true;
    })
    this.setData({
      moneyList: moneyList,
      currentMoney: value[0]
    })
  },

  // 充值
  payMoney: function () {
    // wx.showToast({
    //   icon: 'none',
    //   title: '该功能未完善',
    // })
    tapedFun(this)
    getPay({
      amount: this.data.currentMoney.value
    }).then(res => {
      const that = this;
      if (res && res.data) {
        const payParams = res.data;
        wx.requestPayment({
          'appId': payParams.appId,
          'timeStamp': payParams.timeStamp.toString(),
          'nonceStr': payParams.nonceStr,
          'package': payParams.packageValue,
          'signType': payParams.signType,
          'paySign': payParams.paySign,
          'success': function (res) {
            if (res.errMsg == "requestPayment:ok") { // 调用支付成功
              that.goBack();
              showToast('支付成功')
            } else if (res.errMsg === 'requestPayment:cancel') { // 用户取消支付的操作
              showToast('取消支付')
            }
          },
          'fail': function (res) {
            // showToast('支付失败')
            return false;
          },
          'complete': function (res) {}
        })
      }

    })
  },

  goBack: function () {
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
})