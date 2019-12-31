import {
  getTaskList
} from '../../api/api.js'
import {
  showToast,
  tapedFun
} from '../../../utils/util.js'
Component({
  properties: {
    tab: {
      type: String,
      value: "task"
    },
    organizeId: {
      type: String,
      value: ""
    },
    userType: {
      type: String,
      value: '',
    }
  },
  data: {
    listDatas: null,
    userInfo: null,
    buttonClicked: false,
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      this.setData({
        userInfo: wx.getStorageSync('userInfo')
      })
    },
    moved: function () {},
    detached: function () {},
  },
  ready: function () {
    this.getData()
  },

  methods: {

    getData: function () {
      getTaskList({
        organizeId: this.properties.organizeId
      }).then(res => {
        res && this.setData({
          listDatas: res.data.list
        })
      })
    },
    onClickItem: function (e) {
      tapedFun(this)
      const item = e.currentTarget.dataset.item;
      if (item.taskProgress === 100) {
        return;
      }
      showToast('该任务还没完成快去通知会长吧');
    },
  }
})