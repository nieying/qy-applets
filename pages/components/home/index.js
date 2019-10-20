import {
  getUnit,
  getUserDialectList,
  changeDialect
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
    showBuyModal: false,
    showDialect: false,
    currentDialect: {},
    userDialect: [],
    unitList: [],
    userInfo: {},
    currentUnit: {},
  },

  ready: function() {
    this.getData();
  },


  attached: function() {
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
      height: parseInt(wx.getStorageSync('statusBarHeight')) + 10,
      warpHeight: parseInt(wx.getStorageSync('warpHeight')) + 10,
    })
  },

  onShow: function() {
    console.log('---onShow')
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getData: function() {
      // 获取用户已经学习的方言
      wx.showLoading()
      getUserDialectList().then(res => {
        console.log('getUserDialectList', res)
        let userDialect = res.data;
        let currentDialect = [];
        if (wx.getStorageSync('lastLanguage') && wx.getStorageSync('lastLanguage').length>0) {
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
      wx.redirectTo({
        url: '/pages/language/language'
      })
    },

    goSubject: function() {
      const {
        currentDialect,
        currentUnit
      } = this.data
      wx.navigateTo({
        url: `/pages/subject/subject?id=${currentUnit.id}&languageId=${currentDialect.languageId}`})
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
        wx.hideLoading()
        console.log('getUnitList res', res, this.data.currentUnit)
      })
    },

    // 点击单元
    clickUnit: function(e) {
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
    showBuyModal: function() {
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