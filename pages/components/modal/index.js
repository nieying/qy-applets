import {
  updateUserInfo,
  searchOrgan,
} from '../../api/api.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //是否显示modal
    modalData: {
      type: Object,
    },
    show: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    nickName: '',
    signature: '',
    searchKey: '',
    isErr: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickMask(e) {
      let id = e.currentTarget.dataset.id;
      if (id == 1) {
        this.setData({
          show: false
        })
      }
    },

    // 获取输入框的值
    getInputValue(e) {
      const {
        modalData
      } = this.properties;
      if (modalData.type === 1) {
        this.setData({
          nickName: e.detail.value
        })
      } else {
        this.setData({
          searchKey: e.detail.value
        })
      }
    },
    getTextAreaValue(e) {
      this.setData({
        signature: e.detail.value
      })
    },

    confirm() {
      const {
        modalData
      } = this.properties;
      switch (modalData.type) {
        case 1:
          this.editUserInfo({
            nickName: this.data.nickName
          })
          break;
        case 2:
          this.editUserInfo({
            signature: this.data.signature
          })
          break;
        case 3:
          this.searchOrganize()
          break;
      }
    },

    // 查询协会列表
    searchOrganize() {
      searchOrgan({
        name: this.data.searchKey
      }).then(res => {
        wx.setStorageSync('seachOrganList', res.data ? res.data.list : [])
        wx.navigateTo({
          url: '/pages/searchUnion/searchUnion',
        })
      })

    },

    // 编辑用户信息
    editUserInfo(params) {
      updateUserInfo(params).then(res => {
        this.setData({
          show: false
        })
      });
      this.triggerEvent('confirm')
    }
  }
})