import {
  joinOrganize,
  getPay
} from '../api/api.js'
import {
  showToast,
  tapedFun,
  copyText
} from '../../utils/util.js'
const app = getApp()
Page({
  data: {
    height: 0,
    buttonClicked: false,
    showTips: false,
    pageType: 1, // 1 提交信息页面， 2 支付完成提示页面， 3 待支付页面
    currentTab: 'work',
    tabs: [{
      key: 'work',
      name: "我是在职",
      active: "active"
    }, {
      key: 'student',
      name: "我是学生",
      active: ""
    }],
    state: null,
  },

  onLoad: function(options) {
    this.setData({
      height: wx.getStorageSync('statusBarHeight') + 10,
      warpHeight: parseInt(wx.getStorageSync('warpHeight')),
      organizeId: options.organizeId,
    })
    if (options.state && parseInt(options.state) === 0) {
      this.setData({
        pageType: 3
      })
    }
  },

  goBack: function() {
    wx.navigateBack()
  },

  onSubmit: function(e) {
    if (!(/^1[3456789]\d{9}$/.test(e.detail.value.mobile))) {
      wx.showToast({
        title: '手机号码有误',
        duration: 2000,
        icon: 'none'
      });
      return false;
    }
    tapedFun(this);
    const {
      name,
      company,
      job,
      grade,
      school,
      mobile,
      remark
    } = e.detail.value
    joinOrganize({
      joinType: this.data.currentTab,
      organizeId: this.data.organizeId,
      company,
      grade,
      job,
      name,
      school,
      mobile,
      remark
    }).then(res => {
      res && this.pay(res.data)
    })
  },

  onConfirm: function() {
    tapedFun(this);
    wx.navigateTo({
      url: '/pages/main/main',
    })
  },

  onPay: function() {
    tapedFun(this);
    const params = JSON.parse(wx.getStorageSync('payInfo'))
    console.log('params', params)
    this.pay(params)
  },

  pay: function(d) {
    getPay({
      amount: d.amount,
      orderId: d.orderId,
      orderSn: d.orderSn,
      type: 'join_organize',
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
          'success': function(res) {
            if (res.errMsg == "requestPayment:ok") { // 调用支付成功
              that.setData({
                pageType: 2
              })
              showToast('支付成功')
            } else if (res.errMsg === 'requestPayment:cancel') { // 用户取消支付的操作
              showToast('取消支付')
            }
          },
          'fail': function(res) {
            // showToast('支付失败')
            return false;
          },
          'complete': function(res) {}
        })
      }

    })
  },

  textPaste: function() {
    copyText('test20076')
  },

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