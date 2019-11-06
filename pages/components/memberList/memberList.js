import {
  approvalmember,
  kickOrgan
} from '../../api/api.js'
import {
  formatDate,
  formatList,
  showToast
} from '../../../utils/util.js'
var cnChar = require('../../../utils/cnChar.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    datas: {
      type: Array,
      value: []
    },
    tab: {
      type: String,
      value: "union"
    },
    userType: {
      type: String,
      value: '',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    listDatas: null,
    userInfo: null
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function() {
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
    pass: function(e) {
      wx.showLoading({
        title: '',
        mask: true
      })
      const {
        organizeid,
        pass,
        userid
      } = e.currentTarget.dataset
      approvalmember({
        organizeId: organizeid,
        pass: pass,
        userId: userid
      }).then(res => {
        this.triggerEvent('callback')
        showToast(pass ? '通过成功' : '拒绝成功')
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
    }
  }
})