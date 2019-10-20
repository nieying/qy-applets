import {
  approvalmember
} from '../../api/api.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    datas: {
      type: Object,
      value: {}
    },
    tab: {
      type: String,
      value: "union"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  attached: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    pass: function(e) {
      const {
        organizeid,
        pass,
        userid
      } = e.currentTarget.dataset
      approvalmember({
        organizeId: organizeid,
        pass: pass,
        userId: userid
      }).then(res => {
        //  todo
        wx.showToast({
          icon: 'success',
          title: pass ? '通过成功' : '拒绝成功'
        })
      })
    }
  }
})