const ENV = 0;
const domainName = ['http://api.deyushiyuan.cn/litemall/admin'][ENV];
const AppId = 'wx84aa4b7c0fc9c4ca'; // 微信appid  
const SessionKey = '5579ce3a448b0ea85bfd5c6ff0e73919'; // 微信秘钥（微信后台秘钥保存好、刷新会重新生成)


// 授权
const authorize = () => {
// POST "/wx/auth/login_by_weixin"
}


// 绑定手机号
const bindPhone = () => {
  // POST /wx/auth/bindPhone
}



// 获取用户信息
const getUserInfo = () => {
  wx.request({
    url: domainName + '/wx/auth/info',
    data: {
      x: '',
      y: ''
    },
    header: {
      'content-type': 'application/json'
    },
    success(res) {
      console.log(res.data)
    }
  })
}

// 跟新用户信息
// POST /wx/auth/profile