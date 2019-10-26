import {
  queryUserInfo,
  getState,
  getUserGarde
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
    // this.getStateData();
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
    getData: function() {
      wx.showLoading()
      queryUserInfo().then(res => {
        console.log('queryUserInfo', res)
        this.setData({
          userInfo: res.data
        })
        wx.setStorageSync('userInfo', res.data)
        this.getAchieve(res.data.lastLanguage.languageId)
        wx.hideLoading()
      })
    },
    // 获取成就
    getAchieve: function(id) {
      getUserGarde({
        languageId: id
      }).then(res => {
        res.data.forEach(item => {
          if (item.type === 'languageProcess' && item.value === 100) {
            item.isActive = true
          } else if (item.type === 'actTimes' && item.value > 0) {
            item.isActive = true
          } else if ((item.type === 'bigRich' || item.type === 'bigWinner') && item.value.name) {
            item.isActive = true
          } else if (item.type === 'languageProveList' && item.value.length > 0) {
            item.isActive = true
          } else if (item.type === 'actTimes' && item.value > 0) {
            item.isActive = true
          } else if ((item.type === 'exactPrize' || item.type === 'smallFire' || item.type === 'mediumFire' || item.type === 'maxFire') && item.value) {
            item.isActive = true
          } else {
            item.isActive = false
          }
        })
        this.setData({
          gardeList: res.data
        })
        console.log('gardeList====>', res.data)
      })
    },
    // 显示弹框
    showModal: function(e) {
      const {
        userInfo
      } = this.data;
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
          this.getStateData()
          break;
      }
    },
    getStateData: function() {
      // wx.showLoading()
      getState().then(res => {
        // this.setData({
        //   userType: res.data
        // })
        // wx.hideLoading()
        this.getUserUnion(res.data);
      })
    },

    getUserUnion: function(userType) {
      // const {
      //   userType
      // } = this.data;
      if (userType === 'leader') { // 会长
        wx.navigateTo({
          url: `/pages/union/union?userType=${userType}`,
        })
      } else { // 成员
        if (userType === 'none') { // 未加入协会
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
        } else if (userType === 'applied') { // 加入协会审核中
          wx.navigateTo({
            url: `/pages/applyFeedback/applyFeedback?userType=${userType}`,
          })
        } else if (userType === 'rejected') { // 审核失败
          wx.navigateTo({
            url: `/pages/applyFeedback/applyFeedback?userType=${userType}`,
          })
        } else { // 审核成功
          wx.navigateTo({
            url: `/pages/union/union?userType=${userType}`,
          })
        }
      }
    },

    // 弹框确定后触发
    onConfirm: function() {
      this.getData();
    },

    goPay: function () {
      wx.navigateTo({
        url: '/pages/pay/pay',
      })
    }
  }
})