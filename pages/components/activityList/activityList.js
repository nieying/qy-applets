import {
  getOrganActivityList
} from '../../api/api.js'
Component({
  properties: {
    tab: {
      type: String,
      value: "task"
    },
    organizeId: {
      type: String,
      value: '',
    }
  },
  data: {
    listDatas: null,
    userInfo: null
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      this.setData({
        userInfo: wx.getStorageSync('userInfo')
      })
    }
  },

  ready: function () {
    this.getData()
  },

  methods: {
    getData: function () {
      getOrganActivityList({
        organizeId: this.properties.organizeId
      }).then(res => {
        res && this.setData({
          listDatas: res.data.list
        })
      })
    },
    goToActivityDetail: function (e) {
      const id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/activityDetail/activityDetail?id=${id}&organizeId=${this.properties.organizeId}`,
      })
    }
  }
})