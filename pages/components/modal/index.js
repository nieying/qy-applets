Component({

  /**
   * 组件的属性列表
   */
  properties: {
    //是否显示modal
    modalData: {
      type: Object,
    },
    show: {
      type: Boolean,
      value: false
    },
    //modal的高度
    height: {
      type: String,
      value: '488rpx'
    }
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
    clickMask() {
      // this.setData({show: false})
    },

    cancel() {
      this.setData({
        show: false
      })
      this.triggerEvent('cancel')
    },

    confirm() {
      this.setData({
        show: false
      })
      wx.navigateTo({
        url: '/pages/searchUnion/searchUnion',
      })
      this.triggerEvent('confirm')
    }
  }
})