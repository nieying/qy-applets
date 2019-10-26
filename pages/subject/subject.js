import {
  getSubject,
  postSubject,
  getUnitSubject
} from '../api/api.js';
let timer = ''
const app = getApp()
const innerAudioContext = wx.createInnerAudioContext()
Page({

  /**
   * 页面的初始数据
   */
  //normal:文字题（伪音标题），auto:听力题，picture:选图题，map:看图题
  data: {
    height: 0,
    warpHeight: 0,
    isLoading: true,
    isAnswered: false,
    isShowNote: false,
    isPlay: false,
    selectId: '',
    rightId: '',
    answerObj: {},
    subjectObj: {},
    nextSubject: {},
    currentNote: {},
    currentDialect: {},
    userInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('options', options)
    this.setData({
      height: wx.getStorageSync('statusBarHeight') + 10,
      warpHeight: parseInt(wx.getStorageSync('warpHeight')),
      currentDialect: wx.getStorageSync('lastLanguage')
    });
    this.getData(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    if (this.data.isLoading) {
      timer = setTimeout(() => {
        this.setData({
          isLoading: false
        })
      }, 2000)
    }
  },

  // 返回
  goBack: function() {
    wx.navigateBack()
  },

  // 获取数据
  getData: function(options) {
    wx.showLoading()
    getSubject({
      languageId: options.languageId
    }).then(res => {
      wx.hideLoading()
      this.dealData(res.data)
    })
  },
  // 获取下一题
  getNextSubject: function(e) {
    const type = e.currentTarget.dataset.type;
    if (type === 'submit') {
      wx.showLoading()
      const {
        rightId,
        selectId
      } = this.data;
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
      if (this.data.nextSubject.answers) {
        this.dealData(this.data.nextSubject)
      } else {
        wx.showToast({
          icon: 'none',
          title: '该单元已学完！',
        })
       setTimeout(() => {
          wx.redirectTo({
            url: '/pages/main/main',
          })
        }, 2000)
      }
    }

  },

  // 处理请求的数据
  dealData: function(obj) {
    let rightId = ''
    obj.answers.forEach(a => {
      if (a.right) {
        rightId = a.id
      }
      a.checked = false
    })
    const notes = JSON.parse(obj.notes);
    if (obj.type === 'normal' && notes.length > 0) {
      notes.forEach(item => {
        obj.title1 = obj.title.replace(new RegExp(`(${item.key})`, 'g'), ',$1,');
      })
      obj.titleList = obj.title1.split(',').filter(item => !!item).map(item => {
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
    }

    this.setData({
      subjectObj: obj,
      rightId: rightId,
      isAnswered: false,
      selectId: '',
    })
  },

  // 播放音频
  audioPlay: function() {
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
  audioStop: function() {
    innerAudioContext.stop();
    innerAudioContext.onStop(() => {
      this.setData({
        isPlay: false
      })
      console.log('录音播放停止');
    });  
  },

  //单选
  getradio: function(e) {
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
      console.log('selectAnswer', this.data)
    }
  },

  // 提交
  submit: function(e) {
    const {
      rightId,
      selectId
    } = this.data;
    this.setData({
      isAnswered: true,
      answerObj: {
        className: selectId === rightId ? 'correct' : 'wrong',
        color: selectId === rightId ? '#00C853' : '#F44336',
        icon: selectId === rightId ? 'success' : 'clear',
        txt1: selectId === rightId ? '恭喜您!' : '很遗憾!',
        txt2: selectId === rightId ? '答对了' : '答错了'
      }
    })
  },

  // 显示注释
  showNote: function(e) {
    const item = e.currentTarget.dataset.item;
    if (item.value) {
      this.setData({
        isShowNote: true,
        currentNote: item
      })
    }
  },

  onHide: function() {
    clearTimeout(timer);
  },

  onUnload: function() {
    if (this.data.subjectObj.type === 'auto') {
      this.audioStop()
    }
  },
})