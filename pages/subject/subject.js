import {
  getSubject,
  postSubject,
  getAdPage,
} from '../api/api.js';
import {
  showToast,
  countRpx
} from '../../utils/util.js'
let timer = ''
const app = getApp()
const innerAudioContext = wx.createInnerAudioContext()

Page({
  //normal:文字题（伪音标题），auto:听力题，picture:选图题，map:看图题
  data: {
    isLoading: false,
    isAnswered: false,
    isShowNote: false,
    isPlay: false,
    selectId: '',
    rightId: '',
    answerObj: {},
    subjectObj: {},
    nextSubject: {},
    currentNote: {},
    userInfo: {},
    adObj: null,
    show: false
  },


  onLoad: function (options) {
    console.log('options', options)
    this.setData({
      height: parseInt(wx.getStorageSync('statusBarHeight')) + 10,
      warpHeight: wx.getStorageSync('warpHeight') - countRpx(48, wx.getStorageSync('windowWidth'))
    });
    this.getData(options)
  },


  onReady: function () {
    if (this.data.isLoading) {
      getAdPage().then(res => {
        if (res && res.data[0]) {
          this.setData({
            adObj: res.data[0]
          })
        }
        timer = setTimeout(() => {
          this.setData({
            isLoading: false
          })
        }, 3000)
      })

    }
  },

  // 返回
  goBack: function () {
    wx.reLaunch({
      url: '/pages/main/main',
    })
  },

  // 获取数据
  getData: function (options) {
    wx.showLoading()
    let params = {
      languageId: options.languageId
    }
    if (options.state === 'old') {
      params.unitId = options.unitId
    }
    getSubject(params).then(res => {
      wx.hideLoading()
      this.dealData(res.data)
    })
  },
  // 获取下一题
  getNextSubject: function (e) {
    if (!wx.getStorageSync('loginCode')) {
      wx.showModal({
        title: '提示',
        content: '您还没有登录,不能参与答题',
        confirmText: '去登入',
        cancelText: '取消',
        mask: true,
        success: function (res) {
          if (res.confirm) {
            wx.redirectTo({ 
              url: '/pages/guide/guide'
            });
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
      return
    }
    const type = e.currentTarget.dataset.type;
    const {
      rightId,
      selectId
    } = this.data;
    if (!selectId) {
      return
    }
    this.stopAuto();
    if (type === 'submit') {
      // if(rightId === selectId) {
      //   wx.vibrateShort()
      // } else {
      //   wx.vibrateLong()
      // }
      wx.showLoading()
      postSubject({
        right: rightId === selectId,
        subjectId: this.data.subjectObj.id,
      }).then(res => {
        wx.hideLoading()
        this.setData({
          nextSubject: res.data,
          userInfo: res.data.userInfo,
        })
        this.submit()
      })
    } else {
      const {
        nextSubject
      } = this.data
      this.setData({
        warpHeight: wx.getStorageSync('warpHeight') - countRpx(48, wx.getStorageSync('windowWidth')),
      })
      if (nextSubject.answers) {
        if (nextSubject.userInfo.cost === 0 && !nextSubject.userInfo.costLock) {
          showToast('生命值不足无法答题');
          // wx.navigateTo({
          //   url: '/pages/pay/pay?prePage=subject',
          // })
          return;
        }
        this.dealData(nextSubject)
      }
      if (nextSubject.userInfo.progress === 100 && !nextSubject.unitId) {
        wx.navigateTo({
          url: `/pages/certificate/certificate?proveNum=${nextSubject.proveNum}&prevPage=home`,
        })
        return
      }
      if (nextSubject.userInfo.unitProgress === 100 && !nextSubject.unitId) {
        showToast('该单元已学完！')
        setTimeout(() => {
          this.goBack()
        }, 2000)
      }
    }
  },

  // 处理请求的数据
  dealData: function (obj) {
    let rightId = ''
    obj.answers.forEach(a => {
      if (a.right) {
        rightId = a.id
      }
      a.checked = false
    })
    const notes = JSON.parse(obj.notes);
    obj.title1 = obj.title;
    if (obj.type !== 'map' && notes.length > 0) {
      notes.forEach(item => {
        obj.title = obj.title.replace(new RegExp(`(${item.key})`, 'g'), ',$1,');
      })
      console.log('obj.title1', obj.title, notes, obj.title1)
      obj.titleList = obj.title.split(',').filter(item => !!item).map(item => {
        let d = notes.find(n => n.key === item);
        if (d) {
          return {
            key: item,
            value: d.value
          }
        } else {
          return {
            key: item,
            value: ''
          }
        }
      })

      console.log('------>obj.titleList', obj.titleList)
    }
    this.setData({
      subjectObj: obj,
      userInfo: obj.userInfo,
      rightId: rightId,
      isAnswered: false,
      // isAnswered: true,
      selectId: '',
    })
  },

  // 播放音频
  audioPlay: function () {
    innerAudioContext.src = this.data.subjectObj.filePath;
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      this.setData({
        isPlay: true
      })
      console.log('录音播放中');
    });
    innerAudioContext.onEnded(() => {
      this.setData({
        isPlay: false
      })
      console.log('录音播放结束');
    })
  },
  // 停止播放
  audioStop: function () {
    innerAudioContext.stop();
    innerAudioContext.onStop(() => {
      this.setData({
        isPlay: false
      })
      console.log('录音播放停止');
    });
  },

  //单选
  getradio: function (e) {
    if (!this.data.isAnswered) {
      let index = e.currentTarget.dataset.id;
      const {
        subjectObj
      } = this.data;
      let radio = subjectObj.answers;
      let selectId = '';
      for (let i = 0; i < radio.length; i++) {
        subjectObj.answers[i].checked = false;
      }
      if (radio[index].checked) {
        subjectObj.answers[index].checked = false;
      } else {
        subjectObj.answers[index].checked = true;
        selectId = subjectObj.answers[index].id
      }
      this.setData({
        subjectObj: subjectObj,
        selectId: selectId,
      })
    }
  },

  // 提交
  submit: function (e) {
    const {
      rightId,
      selectId
    } = this.data;
    this.setData({
      isAnswered: true,
      warpHeight: wx.getStorageSync('warpHeight') - countRpx(292, wx.getStorageSync('windowWidth')),
      answerObj: {
        className: selectId === rightId ? 'correct' : 'wrong',
        icon: selectId === rightId ? 'check-success' : 'check-error',
        txt1: selectId === rightId ? '恭喜您!' : '很遗憾!',
        txt2: selectId === rightId ? '答对了' : '答错了'
      }
    })
  },

  // 显示注释
  showNote: function (e) {
    const item = e.currentTarget.dataset.item;
    if (item.value) {
      this.setData({
        isShowNote: true,
        currentNote: item
      })
    }
  },

  onHide: function () {
    clearTimeout(timer);
  },

  onUnload: function () {
    this.stopAuto()
  },

  stopAuto: function () {
    if (this.data.subjectObj.type === 'auto') {
      this.audioStop()
    }
  },

  clickMask: function (e) {
    let id = e.currentTarget.dataset.id;
    if (id == 1) {
      this.setData({
        showFeedbackModal: false
      })
    }
  },

  showModal: function () {
    this.setData({
      show: true
    })
  }
})