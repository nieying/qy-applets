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
    formData: {},
    genderList: [{
      id: 1,
      name: '男',
      checked: true
    }, {
      id: 2,
      name: '女',
      checked: false
    }],
    ageList: [{
      id: 1,
      name: '20岁以下',
      checked: true
    }, {
      id: 2,
      name: '20-25岁',
      checked: false
    }, {
      id: 3,
      name: '25-30岁',
      checked: false
    }, {
      id: 4,
      name: '30岁以上',
      checked: false
    }]
  },

  onLoad: function (options) {
    this.setData({
      height: wx.getStorageSync('statusBarHeight') + 10,
      warpHeight: parseInt(wx.getStorageSync('warpHeight')),
      organizeId: options.organizeId,
      activityId: options.activityId,
    })
    if (options.state && parseInt(options.state) === 0) {
      this.setData({
        pageType: 3
      })
    }
  },

  bindKeyInput: function (e) {
    const {
      formData
    } = this.data;
    formData[e.target.dataset.key] = e.detail.value;
    this.setData({
      formData
    })
  },

  goBack: function () {
    wx.navigateBack()
  },

  selectGender: function (e) {
    tapedFun(this);
    const index = e.currentTarget.dataset.index;
    const {
      genderList
    } = this.data;
    genderList.forEach(d => {
      return d.checked = false
    })
    genderList[index].checked = true;
    this.setData({
      genderList: genderList
    })
    console.log(genderList.filter(g => g.checked)[0].name)
  },
  selectAge: function (e) {
    tapedFun(this);
    const index = e.currentTarget.dataset.index;
    const {
      ageList
    } = this.data;
    ageList.forEach(d => {
      return d.checked = false
    })
    ageList[index].checked = true;
    this.setData({
      ageList: ageList
    })
  },

  onSubmit: function (e) {
    tapedFun(this);
    const {
      name,
      job,
      mobile,
      remark
    } = this.data.formData
    if (!(/^1[3456789]\d{9}$/.test(mobile))) {
      wx.showToast({
        title: '手机号码有误',
        duration: 2000,
        icon: 'none'
      });
      return false;
    }
    joinOrganize({
      organizeId: this.data.organizeId,
      activityId: this.data.organizeId,
      name,
      gender: genderList.filter(item => item.checked)[0].name,
      age: ageList.filter(item => item.checked)[0].name,
      job,
      mobile,
      remark
    }).then(res => {
      res && this.pay(res.data)
    })
  },

  onConfirm: function () {
    tapedFun(this);
    wx.navigateTo({
      url: '/pages/main/main',
    })
  },

  onPay: function () {
    tapedFun(this);
    const params = JSON.parse(wx.getStorageSync('payInfo'))
    console.log('params', params)
    this.pay(params)
  },

  pay: function (d) {
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
          'success': function (res) {
            if (res.errMsg == "requestPayment:ok") { // 调用支付成功
              that.setData({
                pageType: 2
              })
              wx.setStorageSync('payInfo', null)
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

  textPaste: function () {
    copyText('657465669')
  },

})