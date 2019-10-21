

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
      wx.setStorageSync('statusBarHeight', statusBarHeight)
      if (deviceHeight <= 568) {
        let height = deviceHeight - statusBarHeight - 160
        let height2 = deviceHeight - statusBarHeight
        wx.setStorageSync('warpHeight', height)
        wx.setStorageSync('pageHeight', height2)
      } else {
        let height = deviceHeight - statusBarHeight - 185
        let height2 = deviceHeight - statusBarHeight
        wx.setStorageSync('warpHeight', height)
        wx.setStorageSync('pageHeight', height2)
      }
    }
  })
}


const getSpell = (str, sp) => {
  var i, c, t, p, ret = "";
  var strLength = str.length;
  if (sp === null) { sp = '' };
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




module.exports = {
  copyText: copyText,
  storageHeight: storageHeight,
  getSpell: getSpell
}