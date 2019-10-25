// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    totalBill: 0,
    moneyList: [{
        value: 10,
        checked: false
      },
      {
        value: 30,
        checked: false
      },
      {
        value: 50,
        checked: true
      },
      {
        value: 100,
        checked: false
      },
      {
        value: 200,
        checked: false
      },
      {
        value: 500,
        checked: false
      },
    ],
    currentMoney: [{
      value: 50,
      checked: true
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      height: parseInt(wx.getStorageSync('statusBarHeight')) + 10,
      warpHeight: parseInt(wx.getStorageSync('warpHeight')),
    })
  },

  // 选择方言
  selectMoney: function(e) {
    const {
      moneyList
    } = this.data
    let index = e.currentTarget.dataset.index; //获取用户当前选中的索引值
    let checkBox = moneyList;
    checkBox.forEach(d => {
      d.checked = false;
    });
    if (checkBox[index].checked) {
      moneyList[index].checked = false;
    } else {
      moneyList[index].checked = true;
    }
    //返回用户选中的值
    let value = checkBox.filter((item, index) => {
      return item.checked == true;
    })
    this.setData({
      moneyList: moneyList,
      currentMoney: value[0]
    })
  },

  // 充值
  payMoney: function() {
    wx.showToast({
      icon: 'none',
      title: '该功能未完善',
    })
  },

  goBack: function() {
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
})