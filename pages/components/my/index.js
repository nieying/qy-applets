// pages/components/my/index.js
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
    height: 0
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

  }
})