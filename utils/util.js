const showToast = (title) => {
  wx.showToast({
    icon: 'none',
    title: title,
    duration: 1000,
  })
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const copyText = (data) => {
  wx.showToast({
    title: '复制成功',
  })
  wx.setClipboardData({
    data: data,
    success: function (res) {
      wx.getClipboardData({
        success: function (res) {
          console.log(res.data)
          return res.data
        }
      })
    }
  })
}

const storageHeight = () => {
  wx.getSystemInfo({
    success: (res) => {
      console.log('wx.getSystemInfo::', res)
      let statusBarHeight = res.statusBarHeight
      let deviceHeight = res.windowHeight
      wx.setStorageSync('windowWidth', res.windowWidth)
      wx.setStorageSync('statusBarHeight', statusBarHeight)
      if (deviceHeight <= 568) {
        let height = deviceHeight - statusBarHeight - 140
        let height2 = deviceHeight - statusBarHeight - 75
        wx.setStorageSync('warpHeight', height)
        wx.setStorageSync('pageHeight', height2)
      } else {
        let height = deviceHeight - statusBarHeight - 165
        let height2 = deviceHeight - statusBarHeight - 85
        wx.setStorageSync('warpHeight', height)
        wx.setStorageSync('pageHeight', height2)
      }
    }
  })
}

const countRpx = (val, width) => {
  return val / 750 * width
}

const getSpell = (str, sp) => {
  var i, c, t, p, ret = "";
  var strLength = str.length;
  if (sp === null) {
    sp = ''
  };
  for (i = 0; i < strLength; i++) {
    if (str.charCodeAt(i) >= 0x4e00) {
      p = strGB.indexOf(str.charAt(i));
      if (p > -1 && p < 3755) {
        for (t = qswhSpell.length - 1; t > 0; t = t - 2)
          if (qswhSpell[t] <= p) break;
        if (t > 0) ret += qswhSpell[t - 1] + sp;
      }
    } else {
      ret += str.slice(0, strLength)
    }
  }
  return ret.substr(0, ret.length - sp.length)
}

const formatList = (arr, keyword) => {
  let newArr1 = [];
  let tempArr = [];
  let reg = /\b(\w)|\s(\w)/g;
  let k = 0;
  let firstWord = arr[0][keyword].charAt(0).toUpperCase(); //获取第一个分类字母
  arr.map((v) => {
    v[keyword] = v[keyword].replace(reg, m => m.toUpperCase()); //首字母大写
    if (firstWord == v[keyword].charAt(0)) {
      tempArr.push(v);
      newArr1[k] = {
        title: firstWord,
        list: tempArr
      }
    } else {
      //这里循环到这表示已经第二个字母了
      firstWord = v[keyword].charAt(0); //设置第二字母
      tempArr = []; //把之前的清除掉
      tempArr.push(v); //添加第一个
      newArr1[++k] = { //自增
        title: firstWord,
        list: tempArr
      }
    }
  });
  return newArr1;
}

const tapedFun = (self) => {
  self.setData({
    buttonClicked: true
  })
  setTimeout(function () {
    self.setData({
      buttonClicked: false
    })
  }, 500)
}


module.exports = {
  copyText: copyText,
  storageHeight: storageHeight,
  getSpell: getSpell,
  formatList: formatList,
  showToast: showToast,
  tapedFun: tapedFun,
  countRpx: countRpx
}