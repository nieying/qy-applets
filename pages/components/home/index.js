// pages/components/home/index.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    height: 0,
    showBuyModal: false,
    showDialect: false,
    badgeList: [{
        active: true,
        src: '/pages/images/main/icon-b'
      },
      {
        active: false,
        src: '/pages/images/main/icon-a'
      },
      {
        active: false,
        src: '/pages/images/main/icon-c'
      },
      {
        active: false,
        src: '/pages/images/main/icon-d'
      },
      {
        active: false,
        src: '/pages/images/main/icon-e'
      },
    ]
  },

  attached: function() {
    this.setData({
      height: app.globalData.height
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goLanguage: function() {
      wx.navigateTo({
        url: '/pages/language/language'
      })
    },

    showBuyModal: function() {
      this.setData({
        showBuyModal: !this.data.showBuyModal
      })
    },

    showDialect: function() {
      this.setData({
        showDialect: !this.data.showDialect
      })
    },
  }
})