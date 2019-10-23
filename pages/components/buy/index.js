const app = getApp()

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    //是否显示modal
    show: {
      type: Boolean,
      value: false
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickMask(e) {
      if (e.currentTarget.dataset.id == 1) {
        this.setData({ show: false })
      }
    },

    confirm() {
      this.setData({
        show: false
      })
      this.triggerEvent('confirm')
    },

    // 充值
    pay: function() {
      console.log('pay.......')
      wx.requestPayment({
        'timeStamp': '',
        'nonceStr': '',
        'package': '',
        'signType': 'MD5',
        'paySign': '',
        'success': function(res) {
          console.log('success', res)
        },
        'fail': function(res) {
          console.log('fail', res)
        },
        'complete': function(res) {
          console.log('complete', res)
        }
      })
    }
  }
})