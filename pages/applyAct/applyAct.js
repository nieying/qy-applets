import {
  joinActivity,
  getJoinActivityPay,
  getPay
} from '../api/api.js'
import {
  showToast,
  tapedFun,
} from '../../utils/util.js'
const app = getApp()
Page({
  data: {
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
    console.log('apply act options',options)
    this.setData({
      height: wx.getStorageSync('statusBarHeight') + 10,
      warpHeight: parseInt(wx.getStorageSync('warpHeight')),
      organizeId: options.organizeId,
      activityId: options.activityId,
    })
    getJoinActivityPay().then(res => {
      res && this.setData({
        money: res.data
      })
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
      phone,
      remark
    } = this.data.formData
    if (!name) {
      showToast('请输入您的姓名！')
      return;
    }
    if (!job) {
      showToast('请输入您的职业！')
      return;
    }
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      wx.showToast({
        title: '手机号码有误',
        duration: 2000,
        icon: 'none'
      });
      return;
    }
    joinActivity({
      activityId: this.data.activityId,
      name,
      gender: this.data.genderList.filter(item => item.checked)[0].id,
      ageRange: this.data.ageList.filter(item => item.checked)[0].name,
      job,
      phone,
      remark
    }).then(res => {
      res && this.pay(res.data)
    })
  },

  pay: function (d) {
    getPay({
      amount: this.data.money,
      orderId: d.orderId,
      orderSn: d.orderSn,
      type: 'join_activity',
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
  }
})