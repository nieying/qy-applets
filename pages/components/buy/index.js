import {
  buyCard,
  buyLife
} from '../../api/api.js'
import {
  showToast
} from '../../../utils/util.js'
const app = getApp()

Component({

  properties: {
    show: {
      type: Boolean,
      value: false
    },
    userInfo: {
      type: Object,
      value: null
    },
  },


  data: {
  },

  ready: function() {
  },

  observers: {
    'userInfo': function (userInfo) {
       this.properties.userInfo = userInfo
    }
  },

  methods: {
    clickMask(e) {
      if (e.target.dataset.id == 1) {
        this.triggerEvent('toggleBuyModal')
      }
    },

    // 购买生命值
    onBuyLife: function() {
      buyLife().then(res => {
        res && this.succCallback()
      })
    },
    // 购买生命卡
    onBuyCard: function() {
      buyCard().then(res => {
        res && this.succCallback()
      })
    },

    succCallback: function() {
      showToast('购买成功！')
      this.triggerEvent('getUserInfo')
    }
  }
})