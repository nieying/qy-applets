import {
  getOrganActivityList
} from '../../api/api.js'
import {
  formatDate,
  formatList,
  showToast
} from '../../../utils/util.js'
var cnChar = require('../../../utils/cnChar.js');
Component({
  properties: {
    tab: {
      type: String,
      value: "task"
    },
    userType: {
      type: String,
      value: '',
    }
  },
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
    }
  },

  ready: function() {
    this.getData()
  },

  methods: {
    getData: function() {
      getOrganActivityList({
        organizeId: 21
      }).then(res => {
        res && this.setData({
          listDatas: res.data.list
        })
      })
    }
  }
})