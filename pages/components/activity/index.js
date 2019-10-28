import {
  getActivityList
} from '../../api/api.js'
const app = getApp()

Component({
  properties: {

  },

  data: {
    list: null,
    height: 0,
    warpHeight: 0,
  },

  // 组件生命周期函数，在组件实例进入页面节点树时执行。
  attached: function() {
    this.setData({
      height: parseInt(wx.getStorageSync('statusBarHeight')) + 10,
      warpHeight: parseInt(wx.getStorageSync('warpHeight')) 
    })
  },
  // 在组件布局完成后执行，此时可以获取节点信息
  ready: function() {
    wx.showLoading()
    getActivityList().then(res => {
      this.setData({
        list: res.data.list
      })
      wx.hideLoading()
    })
  },

  methods: {
    goToActivityDetail: function(e) {
      const id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/activityDetail/activityDetail?id=${id}`,
      })
    }
  }
})