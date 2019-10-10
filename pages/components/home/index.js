// pages/components/home/index.js
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
    showBuyModal: false,
    showDialect: false,
    badgeList: [{
        active: true,
        src: '/pages/images/main/icon-b'
      },
      {
        active: false,
        src: '/pages/images/main/icon-a'
      },
      {
        active: false,
        src: '/pages/images/main/icon-c'
      },
      {
        active: false,
        src: '/pages/images/main/icon-d'
      },
      {
        active: false,
        src: '/pages/images/main/icon-e'
      },
    ],
    dialectList: [
      { 'value': '四川' },
      { 'value': '东北' },
      { 'value': '粤语' },
      { 'value': '江西' },
    ]

  },

  attached: function() {
    this.setData({
      height: app.globalData.height
    })
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

    showBuyModal: function() {
      this.setData({
        showBuyModal: !this.data.showBuyModal
      })
    },

    showDialect: function() {
      this.setData({
        showDialect: !this.data.showDialect
      })
    },

    //多选
    userCheck: function (e) {
      let index = e.currentTarget.dataset.id;//获取用户当前选中的索引值
      let checkBox = this.data.dialectList;
      if (checkBox[index].checked) {
        this.data.dialectList[index].checked = false;
      } else {
        this.data.dialectList[index].checked = true;
      }
      this.setData({ dialectList: this.data.dialectList })

      //返回用户选中的值
      let value = checkBox.filter((item, index) => {
        return item.checked == true;
      })
      console.log(value)
    }
  }
})