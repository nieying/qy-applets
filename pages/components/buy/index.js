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
    headerHeight: {
      type: String,
      value: ''
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
      this.triggerEvent('confirm')
    }
  }
})