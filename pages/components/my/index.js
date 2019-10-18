import {
  queryUserInfo
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
    height: 0,
    warpHeight: 0,
    show: false,
    modalData: {},
    userInfo: {},
  },

  attached: function() {
    this.getData();
    this.setData({
      height: parseInt(wx.getStorageSync('statusBarHeight')) + 10,
      warpHeight: parseInt(wx.getStorageSync('warpHeight'))
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goVip: function() {
      wx.navigateTo({
        url: '/pages/vip/vip',
      })
    },
    // 获取用户相关信息
    getData: function () {
      wx.showLoading()
      queryUserInfo().then(res=> {
        console.log('queryUserInfo', res)
        this.setData({userInfo: res.data})
        wx.hideLoading()
      })
    },
    // 显示弹框
    showModal: function(e) {
      const {userInfo} = this.data;
      const type = parseInt(e.target.dataset.type)
      switch (type) {
        case 1:
          this.setData({
            show: true,
            modalData: {
              type: 1,
              inputValue: userInfo.nickName,
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
              inputValue: userInfo.signature,
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
              title: '搜索协会',
              placeholder: '请输入协会ID/协会名字来搜索',
              // tips: '格式/字数/重复等错误提示',
              confirmTxt: '搜索'
            }
          })
          break;
      }
    },

    // 弹框确定后触发
    onConfirm: function() {
      this.getData();
    }
  }
})