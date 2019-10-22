import {
  getSubject,
  postSubject,
  getUnitSubject
} from '../api/api.js';
let timer = ''
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  //normal:文字题（伪音标题），auto:听力题，picture:选图题，map:看图题
  data: {
    height: 0,
    warpHeight: 0,
    isLoading: false,
    isAnswered: false,
    isShowNote: false,
    isPlay: false,
    selectId: '',
    rightId: '',
    answerObj: {},
    subjectObj: {},
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
    this.audioCtx = wx.createAudioContext('myAudio')

    if (this.data.isLoading) {
      timer = setTimeout(() => {
        this.setData({
          isLoading: false
        })
      }, 3000)
    }
  },
  audioPlay: function() {
    this.audioCtx.play();
    this.setData({
      isPlay: true
    })
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
      this.dealData(res.data)
    })
  },
  // 获取下一题
  getNextSubject: function() {
    wx.showLoading()
    const {
      rightId,
      selectId
    } = this.data;
    postSubject({
      right: rightId === selectId,
      subjectId: this.data.subjectObj.id,
    }).then(res => {
      this.dealData(res.data)
    })
  },

  // 处理请求的数据
  dealData: function(obj) {
    let rightId = ''
    obj.answers.forEach(a => {
      if (a.right === 1) {
        rightId = a.id
      }
      a.checked = false
    })
    if (obj.type === 'normal') {
      const notes = JSON.parse(obj.notes);
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
      userInfo: obj.userInfo,
      rightId: rightId,
      isAnswered: false,
      selectId: '',
    })
    wx.hideLoading()
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    clearTimeout(timer);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },
})