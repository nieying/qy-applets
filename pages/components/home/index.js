import {
  queryUserInfo,
  getUnit,
  getUserDialectList,
  changeDialect
} from '../../api/api.js'
import {
  showToast,
  tapedFun,
  countRpx
} from '../../../utils/util.js'
const app = getApp()

Component({
  properties: {

  },

  data: {
    height: 0,
    warpHeight: 0,
    showBuyModal: false,
    showDialect: false,
    currentDialect: null,
    userDialect: [],
    unitList: null,
    userInfo: null,
    currentUnit: null,
    buttonClicked: false
  },

  ready: function () {
    this.getUserInfo();
    this.getData();
  },


  attached: function () {
    this.setData({
      height: parseInt(wx.getStorageSync('statusBarHeight')) + 10,
      warpHeight: parseInt(wx.getStorageSync('warpHeight')),
      currentUnitR: countRpx(190, parseInt(wx.getStorageSync('windowWidth'))),
      unitR: countRpx(100, parseInt(wx.getStorageSync('windowWidth')))
    })
  },

  onShow: function () {
    console.log('---onShow')
  },

  methods: {
    getUserInfo: function () {
      queryUserInfo().then(res => {
        this.setData({
          userInfo: res.data
        })
        wx.setStorageSync('userInfo', res.data)
      })
    },
    getData: function () {
      // 获取用户已经学习的方言
      wx.showLoading()
      getUserDialectList().then(res => {
        console.log('getUserDialectList', res)
        wx.hideLoading()
        let userDialect = res.data;
        let currentDialect = [];
        if (wx.getStorageSync('lastLanguage') && wx.getStorageSync('lastLanguage').length > 0) {
          currentDialect = wx.getStorageSync('lastLanguage');
        } else {
          currentDialect = userDialect[0]
        }
        userDialect.length > 0 && userDialect.forEach(d => {
          if (currentDialect.languageId === d.languageId) {
            d.checked = true
          } else {
            d.checked = false;
          }
        });
        this.setData({
          userDialect: userDialect,
          currentDialect: currentDialect,
        }, () => {
          const {
            currentDialect
          } = this.data;
          currentDialect && this.getUnitList(currentDialect.languageId)
        })
      })
    },
    goLanguage: function () {
      // navigateTo
      tapedFun(this);
      wx.navigateTo({
        url: '/pages/language/language'
      })
    },

    // 去答题
    goSubject: function () {
      const {
        currentDialect,
        currentUnit,
        userInfo
      } = this.data
      if (userInfo.cost === 0 && !userInfo.costLock) {
        showToast('生命值不足')
        return;
      }
      if (currentUnit.learnState === 'old') {
        // showToast('该单元已学完')
        // return;
        wx.navigateTo({
          url: `/pages/subject/subject?unitId=${currentUnit.id}&languageId=${currentDialect.languageId}&state=${currentUnit.learnState}`
        })
      } else {
        wx.navigateTo({
          url: `/pages/subject/subject?unitId=${currentUnit.id}&languageId=${currentDialect.languageId}`
        })
      }
    },

    // 获取单元列表
    getUnitList: function (languageId) {
      getUnit({
        languageId: languageId
      }).then(res => {
        res.data.forEach((r, i) => {
          if (r.progress > 0) {
            r.active = true
          } else {
            r.active = false
          }
        })
        this.setData({
          currentUnit: res.data.length > 0 ? res.data[0] : {},
          unitList: res.data.length === 1 ? res.data.concat([{
            learnState: 'future',
            isEmpty: true
          }, {
            learnState: 'future',
            isEmpty: true
          }]) : res.data
        })
        this.setData({
          loading: false
        })
        console.log('getUnitList res', res, this.data.currentUnit)
      })
    },

    // 点击单元
    clickUnit: function (e) {
      const unit = e.currentTarget.dataset['item'];
      if (unit.isEmpty) {
        showToast('该单元建设中！')
        return;
      }
      if (!unit.state) {
        showToast('该单元暂时还没完善噢，请耐性等候一下下吧！')
        return;
      }
      if (unit.learnState === 'future') {
        showToast('请先学习前面的单元')
        return;
      }
      this.setData({
        currentUnit: e.currentTarget.dataset['item'],
      })
    },

    // 选择方言
    selectDialect: function (e) {
      const {
        userDialect
      } = this.data
      let index = e.currentTarget.dataset.index; //获取用户当前选中的索引值
      let item = e.currentTarget.dataset.item; //获取用户当前选中的索引值
      let checkBox = userDialect;
      checkBox.forEach(d => {
        d.checked = false;
      });
      if (checkBox[index].checked) {
        userDialect[index].checked = false;
      } else {
        userDialect[index].checked = true;
      }
      this.setData({
        userDialect: userDialect,
        currentDialect: item,
        showDialect: false
      }, () => {
        wx.setStorageSync("lastLanguage", item)
        this.getUnitList(item.languageId);
        this.postChangeDialect(item.languageId);
      })
      //返回用户选中的值
      // let value = checkBox.filter((item, index) => {
      //   return item.checked == true;
      // })
      // console.log(value)
    },
    // 方言切换请求
    postChangeDialect: function (languageId) {
      changeDialect({
        id: languageId
      }).then(res => {
        console.log('changeDialect res', res)
      })
    },
    toggleBuyModal: function () {
      this.setData({
        showDialect: false,
        showBuyModal: !this.data.showBuyModal,
      })
    },

    showDialect: function () {
      this.setData({
        showBuyModal: false,
        showDialect: !this.data.showDialect
      })
    }
  }
})