import {
  queryUserInfo,
  getState,
  getUserGarde
} from '../../api/api.js'
const app = getApp()
import {
  tapedFun,
  countRpx,
  showToast
} from '../../../utils/util.js'
Component({
  data: {
    height: 0,
    warpHeight: 0,
    show: false,
    modalData: {},
    userInfo: null,
    gardeList: null,
    buttonClicked: false
  },

  attached: function () {
    this.getData();
    this.setData({
      height: parseInt(wx.getStorageSync('statusBarHeight')) + 10,
      warpHeight: parseInt(wx.getStorageSync('warpHeight') - countRpx(48, wx.getStorageSync('windowWidth'))),
      lastOrganize: wx.getStorageSync('lastOrganize')
    })
  },

  methods: {

    // 获取用户相关信息
    getData: function () {
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
    getAchieve: function (id) {
      getUserGarde({
        languageId: id || 0
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
    showModal: function (e) {
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
              placeholder: '请输入您要修改的签名',
              // tips: '格式/字数/重复等错误提示',
              confirmTxt: '确定'
            }
          })
          break;
      }
    },
    // 所属协会
    goPage: function () {
      tapedFun(this)
      const {
        lastOrganize
      } = this.data
      if (lastOrganize && lastOrganize.organizeId) {
        wx.navigateTo({
          url: `/pages/union/union?organizeId=${lastOrganize.organizeId}`,
        })
      } else {
        wx.navigateTo({
          url: `/pages/search/search`,
        })
      }
    },

    // 弹框确定后触发
    onConfirm: function () {
      this.getData();
    },

    onClickAchieve: function (e) {
      tapedFun(this)
      const item = e.currentTarget.dataset.item;
      const lastLanguage = this.data.userInfo.lastLanguage
      if (item.type === 'languageProveList') {
        if (item.value.length > 0) {
          showToast("你已通关该课程!")
        } else {
          showToast(`当前语言进度${lastLanguage.progress}/100`)
        }
        return;
      }

      if (item.type === 'actTimes' && item.value > 0) {
        wx.navigateTo({
          url: '/pages/activity/activity',
        })
        return;
      }
    },

    goPay: function () {
      tapedFun(this)
      wx.navigateTo({
        url: '/pages/pay/pay',
      })
    },
    goVip: function () {
      tapedFun(this)
      wx.navigateTo({
        url: '/pages/vip/vip',
      })
    }
  }
})