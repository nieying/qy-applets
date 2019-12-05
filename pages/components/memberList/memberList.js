import {
  approvalmember,
  kickOrgan
} from '../../api/api.js'
import {
  formatDate,
  formatList,
  showToast,
  tapedFun
} from '../../../utils/util.js'
var cnChar = require('../../../utils/cnChar.js');
Component({
  properties: {
    datas: {
      type: Array,
      value: []
    },
    tab: {
      type: String,
      value: "union"
    },
    role: {
      type: String,
      value: '',
    }
  },

  data: {
    listDatas: null,
    userInfo: null,
    buttonClicked: false,
    showModal: false
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function() {
      console.log('role', this.properties.role)
      this.setData({
        userInfo: wx.getStorageSync('userInfo')
      })
    },
    moved: function() {},
    detached: function() {},
  },

  observers: {
    'datas': function(datas) {
      if (datas.length > 0) {
        datas.forEach(d => {
          d.englishName = d.userName.spell()
        })
        const spellArr = formatList(datas, 'englishName')
        this.setData({
          listDatas: spellArr
        })
      } else {
        this.setData({
          listDatas: []
        })
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

    goTag: function(e) {
      tapedFun(this)
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/pages/tags/tags?userId=${id}`,
      })
    },

    onShowModal: function(e) {
      this.setData({
        showModal: true,
        userId: e.currentTarget.dataset.userid,
        organizeId: e.currentTarget.dataset.organizeid,
      })
    },

    tichu: function(e) {
      wx.showModal({
        title: '提示',
        content: '确定踢除该成员吗？',
        success(res) {
          if (res.confirm) {
            const {
              organizeid,
              pass,
              userid
            } = e.currentTarget.dataset
            kickOrgan({
              userId: userid,
              organizeId: organizeid
            }).then(res => {
              showToast('踢出成功！')
              this.triggerEvent('callback')
            })
          } else if (res.cancel) {}
        }
      })
    },

    // 审核
    onConfirm: function(e) {
      wx.showLoading({
        title: '',
        mask: true
      })
      const type = e.currentTarget.dataset.type;
      approvalmember({
        organizeId: this.data.organizeId,
        pass: type === 'comfirm',
        userId: this.data.userId
      }).then(res => {
        this.triggerEvent('callback')
        showToast(pass ? '通过成功' : '拒绝成功')
        this.setData({
          showModal: false
        })
      })
    },

    clickMask(e) {
      let id = e.currentTarget.dataset.id;
      if (id == 1) {
        this.setData({
          showModal: false
        })
      }
    },
  }
})