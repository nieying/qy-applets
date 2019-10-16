const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
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
    success: function(res) {
      wx.getClipboardData({
        success: function(res) {
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


module.exports = {
  formatTime: formatTime,
  copyText: copyText,
  storageHeight: storageHeight
}