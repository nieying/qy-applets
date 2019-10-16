import request from "../../utils/request";

const AppId = "wx84aa4b7c0fc9c4ca"; // 微信appid
const SessionKey = "5579ce3a448b0ea85bfd5c6ff0e73919"; // 微信秘钥（微信后台秘钥保存好、刷新会重新生成)
const app = getApp();

// 授权
export const uploadWeChatInfo = () => {
  const that = this;
  if (wx.getStorageSync('loginCode')) {
    wx.getUserInfo({
      success: function (res) {
        if (!wx.getStorageSync('token')) {
          request.http({
            url: "/auth/login_by_weixin",
            data: {
              code: wx.getStorageSync('loginCode'),
              userInfo: res.userInfo
            }
          }).then(res => {
            wx.setStorageSync('token', res.data.token);
            request.http({
              url: "/auth/info",
              method: 'GET',
              data: {}
            }).then(res => {
              wx.setStorageSync('userInfo', res.data)
              wx.redirectTo({
                url: "/pages/index/index"
              });
            })

            console.log('login res', res)
          })
        }
      }
    })
  } else {
    wx.redirectTo({
      url: "/pages/guide/guide"
    });
  }
};

// 绑定手机号
export const bindPhone = () => {
  return request.http({
    url: "/auth/bindPhone",
    data: params
  })
};

// 获取用户信息
export const queryUserInfo = (params) => {
  return request.http({
    url: "/auth/info",
    method: 'GET',
    data: params
  })
};

// 跟新用户信息
export const updateUserInfo = (params) => {
  return request.http({
    url: "/auth/profile",
    data: params
  })
};

// 获取启动页
export const getStartUp = (params) => {
  return request.http({
    url: "/startup",
    method: 'GET',
    data: params
  })
};

// 获取广告页
export const getAdPage = (params) => {
  return request.http({
    url: "/advert",
    method: 'GET',
    data: params
  })
};
// 获取活动列表
export const getActivityList = (params) => {
  return request.http({
    url: "/common/activity/list",
    method: 'GET',
    data: params
  })
};

// 获取活动详情
export const getActivityDetail = (params) => {
  return request.http({
    url: "/common/activity/info",
    method: 'GET',
    data: params
  })
};

// 新增用户反馈
export const createFeedback = (params) => {
  return request.http({
    url: "/common/feedback/create",
    data: params
  })
};

// 方言列表
export const getDialectList = (params) => {
  return request.http({
    url: "/language/all/list",
    method: 'GET',
    data: params
  })
};
// 用戶学习新的方言
export const createNewDialect = (params) => {
  return request.http({
    url: "/language/user/add",
    data: params
  })
};
// 已学习方言列表
export const getUserDialectList = (params) => {
  return request.http({
    url: "/language/user/list",
    method: 'GET',
    data: params
  })
};

// 获取题目,接着上次题目继续答题
export const getSubject = (params) => {
  return request.http({
    url: "/subject",
    method: 'GET',
    data: params
  })
};
// 答题上报，记录答题记录
export const postSubject = (params) => {
  return request.http({
    url: "/subject",
    data: params
  })
};
// 单元列表
export const getUnit = (params) => {
  return request.http({
    url: "/unit/list",
    method: 'GET',
    data: params
  })
};