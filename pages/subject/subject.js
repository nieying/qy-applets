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
    correct: 0,
    isAnswered: 0,
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
    getSubject({
      languageId: options.languageId
    }).then(res => {
      if (res.data.lenght > 0) {
        let rightId = ''
        res.data.answers.forEach(a => {
          if (a.right === 1) {
            rightId = a.id
          }
          a.checked = false
        })
        this.setData({
          subjectObj: res.data,
          rightId: rightId
        })
      } else {
        wx.showToast({
          title: res.data.errmsg,
        }),
        wx.goBack()
      }
      console.log('getSubject', res)
    })
  },

  //单选
  getradio: function(e) {
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
  },

  // 提交
  submit: function(e) {
    // 判断是否答对了
    const {
      rightId,
      selectId
    } = this.data;
    if (selectId === rightId) {
      this.setData({
        correct: 1,
        isAnswered: 1,
      })
      // this.getNextSubject(true)
    } else {
      this.setData({
        correct: 2,
        isAnswered: 2,
      })
      // this.getNextSubject(false)
    }
  },

  getNextSubject: function(isRight) {
    postSubject({
      right: isRight,
      subjectId: this.data.subjectObj.id
    }).then(res => {
      this.setData({
        correct: 0,
        isAnswered: 0,
      })
    })
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