import {
  getProtocol,
  getActivityList
} from '../../api/api.js'
const app = getApp()

Component({
  properties: {

  },

  data: {
    list: null,
    protocol: '',
    height: 0,
    warpHeight: 0,
    show: true,
    userInfo: null,
  },

  // 组件生命周期函数，在组件实例进入页面节点树时执行。
  attached: function() {
    this.setData({
      height: parseInt(wx.getStorageSync('statusBarHeight')) + 10,
      warpHeight: parseInt(wx.getStorageSync('warpHeight')),
      userInfo: wx.getStorageSync('userInfo')
    })
  },
  // 在组件布局完成后执行，此时可以获取节点信息
  ready: function() {
    wx.showLoading()
    getProtocol().then(res=> {
      this.setData({
        protocol: res.data
      })
    })
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
    },

    confirm: function() {
      this.setData({ show:false })
    }
  }
})