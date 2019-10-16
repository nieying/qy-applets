import {
  contentHeight
} from '../../../utils/util.js'
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
    warpHeight: 0,
    show: false,
    modalData: {},
    userInfo: {},
  },

  attached: function () {
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
      height: parseInt(wx.getStorageSync('statusBarHeight')) + 10,
      warpHeight: parseInt(wx.getStorageSync('warpHeight'))
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    goVip: function () {
      wx.navigateTo({
        url: '/pages/vip/vip',
      })
    },

    showModal: function (e) {
      const type = parseInt(e.target.dataset.type)
      switch (type) {
        case 1:
          this.setData({
            show: true,
            modalData: {
              type: 1,
              title: '用户名',
              placeholder: '请输入您要修改的用户名',
              tips: '格式/字数/重复等错误提示',
              confirmTxt: '确定'
            }
          })
          break;
        case 2:
          this.setData({
            show: true,
            modalData: {
              type: 2,
              title: '个性签名',
              placeholder: '请输入您要修改的用户名',
              // tips: '格式/字数/重复等错误提示',
              confirmTxt: '确定'
            }
          })
          break;
        case 3:
          this.setData({
            show: true,
            modalData: {
              type: 3,
              title: '个性签名',
              placeholder: '请输入协会ID/协会名字来搜索',
              // tips: '格式/字数/重复等错误提示',
              confirmTxt: '搜索'
            }
          })
          break;
      }
    }
  }
})