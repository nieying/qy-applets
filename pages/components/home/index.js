import {
  getUnit,
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

  // 在组件布局完成后执行，此时可以获取节点信息
  ready: function () {
  },


  attached: function () {
    const userDialect = wx.getStorageSync('userDialect');
    const currentDialect = wx.getStorageSync('currentDialect');
    userDialect.forEach(d => {
      if (currentDialect.languageId === d.languageId) {
        d.checked = true
      } else {
        d.checked = false;
      }
    });
    this.setData({
      userDialect: userDialect,
      currentDialect: currentDialect,
      userInfo: wx.getStorageSync('userInfo'),
      height: parseInt(wx.getStorageSync('statusBarHeight')) + 10,
      warpHeight: parseInt(wx.getStorageSync('warpHeight')) + 10,
    }, () => {
      this.getUnitList(this.data.currentDialect.languageId)
    })
    console.log('attached===>', this.data)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goLanguage: function () {
      wx.navigateTo({
        url: '/pages/language/language'
      })
    },

    goSubject: function () {
      wx.navigateTo({
        url: `/pages/subject/subject?id=${this.data.currentUnit.id}`
      })
    },



    // 获取单元列表
    getUnitList: function (languageId) {
      getUnit({
        languageId: languageId
      }).then(res => {
        this.setData({
          currentUnit: res.data[0],
          unitList: res.data
        })
        console.log('getUnitList res', res)
      })
    },

    // 点击单元
    clickUnit: function (e) {
      this.setData({
        currentUnit: e.currentTarget.dataset['item'],
      })
    },

    // 选择方言
    selectDialect: function (e) {
      const { userDialect } = this.data
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
        wx.setStorageSync("currentDialect", item)
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
    showBuyModal: function () {
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