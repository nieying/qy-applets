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
    currentTab: 'work',
    tabs: [{
      key: 'work',
      name: "我是在职",
      active: "active"
    }, {
      key: 'student',
      name: "我是学生",
      active: ""
    }]
  },

  onLoad: function(options) {
    this.setData({
      height: wx.getStorageSync('statusBarHeight') + 10,
      organizeId: options.organizeId
    })
  },

  onReady: function() {},

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
      res && this.pay()
    })
  },

  pay: function(e) {
    getPay({
      type: 'join_organize',
      amount: 30
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
                showTips: true
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