import {
  getUnit
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
    unitList: [],
    userInfo: {},
    currentUnit: {},
  },

  // 在组件布局完成后执行，此时可以获取节点信息
  ready: function() {
    // wx.showLoading()
    // this.getUserInfo();
    // getUserDialectList().then(res => {
    //   this.setData({
    //     badgeList: res.data.list
    //   })
    //   wx.hideLoading()
    // })
    this.getUnitList()
  },


  attached: function() {
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
      height: parseInt(wx.getStorageSync('statusBarHeight')) + 10,
      warpHeight: parseInt(wx.getStorageSync('warpHeight')) + 10,
    })
    console.log('userInfo', this.data.userInfo)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goLanguage: function() {
      wx.navigateTo({
        url: '/pages/language/language'
      })
    },

    goSubject: function() {
      wx.navigateTo({
        url: `/pages/subject/subject?id=${this.data.currentUnit.id}`
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
    },

    // 获取单元列表
    getUnitList: function() {
      getUnit({
        languageId: 1
      }).then(res => {
        this.setData({
          currentUnit: res.data[0],
          unitList: res.data
        })
        console.log('getUnitList res', res)
      })
    },

    // 点击单元
    clickUnit: function(e) {
      console.log('e.currentTarget.dataset', e.currentTarget.dataset['item']);
      this.setData({
        currentUnit: e.currentTarget.dataset['item'],
      })
    },

    //多选
    userCheck: function(e) {
      let index = e.currentTarget.dataset.id; //获取用户当前选中的索引值
      let checkBox = this.data.dialectList;
      if (checkBox[index].checked) {
        this.data.dialectList[index].checked = false;
      } else {
        this.data.dialectList[index].checked = true;
      }
      this.setData({
        dialectList: this.data.dialectList
      })

      //返回用户选中的值
      let value = checkBox.filter((item, index) => {
        return item.checked == true;
      })
      console.log(value)
    }
  }
})