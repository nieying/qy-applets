import {
  approvalmember
} from '../../api/api.js'
import {
  formatDate, formatList, showToast
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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    listDatas: null
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function() {},
    moved: function() {},
    detached: function() {},
  },

  observers: {
    'datas': function (datas) {
      if(datas.length > 0) {
        datas.forEach(d => {
          d.englishName = d.userName.spell()
        })
        const spellArr = formatList(datas, 'englishName')
        this.setData({ listDatas: spellArr })
        console.log('listDatas===>', this.data, spellArr)
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    pass: function(e) {
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
        //  todo
        showToast(pass ? '通过成功' : '拒绝成功')
        this.triggerEvent('callback')
      })
    }
  }
})