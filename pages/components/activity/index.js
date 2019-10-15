import {
  getActivityList
} from '../../api/api.js'
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
    list: [1, 2, 3, 4, 5],
    height: 0
  },

  // 组件生命周期函数，在组件实例进入页面节点树时执行。
  attached: function() {
    this.setData({
      height: app.globalData.height
    })
  },
  // 在组件布局完成后执行，此时可以获取节点信息
  ready: function() {
    wx.showLoading({
      title: '加载中...'
    })
    getActivityList().then(res => {
      this.setData({
        list: res.data.list
      })
      wx.hideLoading()
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goToActivityDetail: function(e) {
      const id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/activityDetail/activityDetail?id=${id}`,
      })
    }
  }
})