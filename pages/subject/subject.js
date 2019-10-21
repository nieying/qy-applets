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
  data: {
    height: 0,
    isLoading: false,
    //normal:文字题（伪音标题），auto:听力题，picture:选图题，map:看图题
    type: 3,
    isAnswered: 0,
    answerObj: {},
    selectId: '',
    rightId: '',
    subjectObj: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('options', options)
    this.setData({
      height: wx.getStorageSync('statusBarHeight')
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
      }, 3000)
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
      this.dealData(res.data)
    })
  },
  // 获取下一题
  getNextSubject: function(isRight) {
    wx.showLoading()
    postSubject({
      right: isRight,
      subjectId: this.data.subjectObj.id
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
    this.setData({
      subjectObj: obj,
      rightId: rightId,
      isAnswered: 0,
      selectId: '',
    })
    wx.hideLoading()
  },

  //单选
  getradio: function(e) {
    if (this.data.isAnswered === 0) {
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
    // 判断是否答对了
    const {
      rightId,
      selectId
    } = this.data;
    this.setData({
      isAnswered: selectId === rightId ? 1 : 2,
      answerObj: {
        className: selectId === rightId ? 'correct' : 'wrong',
        color: selectId === rightId ? '#00C853' : '#F44336',
        icon: selectId === rightId ? 'success' : 'clear',
        txt1: selectId === rightId ? '恭喜您!' : '很遗憾!',
        txt2: selectId === rightId ? '答对了' : '答错了'
      }
    })
    console.log(this.data)
    // setTimeout(() => {
    //   this.getNextSubject(selectId === rightId)
    // }, 3000)
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