import {
  buyCard,
  buyLife
} from '../../api/api.js'
const app = getApp()

Component({

  properties: {
    show: {
      type: Boolean,
      value: false
    },
  },

  data: {
    userInfo: {}
  },

  ready: function() {
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
  },

  methods: {
    clickMask(e) {
      if (e.target.dataset.id == 1) {
        this.triggerEvent('toggleBuyModal')
      }
    },

    // 购买生命值
    onBuyLife: function() {
      buyLife().then(res => {
        this.succCallback()
      })
    },
    // 购买生命卡
    onBuyCard: function() {
      buyCard().then(res => {
        this.succCallback()
      })
    },

    succCallback: function() {
      wx.showToast({
        icon: '',
        title: '购买成功！',
      })
    }
  }
})