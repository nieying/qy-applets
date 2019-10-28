import {
  queryUserInfo,
  getUnit,
  getUserDialectList,
  changeDialect
} from '../../api/api.js'
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
  },

  ready: function() {
    this.getUserInfo();
    this.getData();
  },


  attached: function() {
    this.setData({
      height: parseInt(wx.getStorageSync('statusBarHeight')) + 10,
      warpHeight: parseInt(wx.getStorageSync('warpHeight')) + 10,
    })
  },

  onShow: function() {
    console.log('---onShow')
  },

  methods: {
    getUserInfo: function() {
      queryUserInfo().then(res => {
        this.setData({
          userInfo: res.data
        })
        wx.setStorageSync('userInfo', res.data)
      })
    },
    getData: function() {
      // 获取用户已经学习的方言
      wx.showLoading()
      getUserDialectList().then(res => {
        console.log('getUserDialectList', res)
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
          this.getUnitList(this.data.currentDialect.languageId)
        })
      })
    },
    goLanguage: function() {
      // navigateTo
      wx.navigateTo({
        url: '/pages/language/language'
      })
    },

    // 去答题
    goSubject: function() {
      const {
        currentDialect,
        currentUnit,
        userInfo
      } = this.data
      if (userInfo.cost === 0) {
        wx.showToast({
          icon: 'none',
          title: '生命值不足',
        })
        return;
      }
      if (currentUnit.learnState === 'old') {
        wx.showToast({
          icon: 'none',
          title: '该单元已学完'
        })
        return;
      }
      wx.navigateTo({
        url: `/pages/subject/subject?id=${currentUnit.id}&languageId=${currentDialect.languageId}`
      })
    },

    // 获取单元列表
    getUnitList: function(languageId) {
      getUnit({
        languageId: languageId
      }).then(res => {
        this.setData({
          currentUnit: res.data.length > 0 ? res.data[0] : {},
          unitList: res.data
        })
        this.setData({ loading: false })
        wx.hideLoading()
        console.log('getUnitList res', res, this.data.currentUnit)
      })
    },

    // 点击单元
    clickUnit: function(e) {
      const unit = e.currentTarget.dataset['item'];

      if (unit.learnState === 'future') {
        wx.showToast({
          icon: 'none',
          title: '请先学习前面的单元'
        })
        return;
      }
      this.setData({
        currentUnit: e.currentTarget.dataset['item'],
      })
    },

    // 选择方言
    selectDialect: function(e) {
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
    postChangeDialect: function(languageId) {
      changeDialect({
        id: languageId
      }).then(res => {
        console.log('changeDialect res', res)
      })
    },
    toggleBuyModal: function() {
      this.setData({
        showDialect: false,
        showBuyModal: !this.data.showBuyModal,
      })
    },

    showDialect: function() {
      this.setData({
        showBuyModal: false,
        showDialect: !this.data.showDialect
      })
    }
  }
})