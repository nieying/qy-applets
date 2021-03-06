import request from "../../utils/request";

const AppId = "wxff70b91c99e1a8b3"; // 微信appid
const SessionKey = "f6fa1655c4ace4697f65b5e8637c2546"; // 微信秘钥（微信后台秘钥保存好、刷新会重新生成)
const app = getApp();

// 授权
export const uploadWeChatInfo = () => {
  const that = this;
  console.log('uploadWeChatInfo', wx.getStorageSync('loginCode'))
  if (wx.getStorageSync('loginCode')) {
    wx.getUserInfo({
      success: function(res) {
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
              wx.setStorageSync('lastOrganize', res.data.lastOrganize)
              wx.setStorageSync('lastLanguage', res.data.lastLanguage)
              wx.redirectTo({
                url: "/pages/index/index"
              });
            })
            console.log('login res', res)
          })
        } 
      }
    })
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
// 获取用户参加的活动列表
export const getUserActivityList = (params) => {
  return request.http({
    url: "/common/user/activity/list",
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

// 新增协会反馈
export const createOrganFeedback = (params) => {
  return request.http({
    url: "/common/feedback/organize/create",
    data: params
  })
};

// 用户成就查询
export const getUserGarde = (params) => {
  return request.http({
    url: "/common/grade/info",
    method: 'GET',
    data: params
  })
};
// 用户成就查询
export const joinActivity = (params) => {
  return request.http({
    url: "/common/activity/join",
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
// 用户学习新的方言
export const createNewDialect = (params) => {
  return request.http({
    url: "/language/user/add",
    data: params
  })
};
// 用户方言切换
export const changeDialect = (params) => {
  return request.http({
    url: "/language/user/change",
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

// 查询单元下的所有题目
export const getUnitSubject = (params) => {
  return request.http({
    url: "/unit/subject",
    method: 'GET',
    data: params
  })
};

// 协会详情
export const getOrganizeDetail = (params) => {
  return request.http({
    url: "/organize/info",
    method: 'GET',
    data: params
  })
};

// 协会加入申请
export const joinOrganize = (params) => {
  return request.http({
    url: "/organize/join",
    data: params
  })
};

// 申请成员审核通过
export const approvalmember = (params) => {
  return request.http({
    url: "/organize/member/approval",
    data: params
  })
};
// 协会成员列表
export const getOrganMemberList = (params) => {
  return request.http({
    url: "/organize/member/list",
    method: 'GET',
    data: params
  })
};
// 退出协会
export const quitOrgan = (params) => {
  return request.http({
    url: "/organize/member/out",
    data: params
  })
};
// 踢除协会
export const kickOrgan = (params) => {
  return request.http({
    url: "/organize/member/quit",
    data: params
  })
};

// 编辑成员
export const editMember = (params) => {
  return request.http({
    url: "/organize/member/info",
    data: params
  })
};

// 协会活动列表
export const getOrganActivityList = (params) => {
  return request.http({
    url: "/organize/activity/list",
    method: 'GET',
    data: params
  })
};


// 协会任务列表
export const getTaskList = (params) => {
  return request.http({
    url: "/organize/task/list",
    method: 'GET',
    data: params
  })
};

// 获取状态
export const getState = (params) => {
  return request.http({
    url: "/organize/state",
    method: 'GET',
    data: params
  })
};
// 协会搜索
export const searchOrgan = (params) => {
  return request.http({
    url: "/organize/search",
    method: 'GET',
    data: params
  })
};
// 用户协会列表
export const getUserOrganList = (params) => {
  return request.http({
    url: "/organize/user",
    method: 'GET',
    data: params
  })
};
// 切换协会
export const jumpUnion = (params) => {
  return request.http({
    url: "/organize/jump",
    data: params
  })
};
// 钞票购买生命卡
export const buyCard = (params) => {
  return request.http({
    url: "/user/card/buy",
    data: params
  })
};
// 钞票购买生命值
export const buyLife = (params) => {
  return request.http({
    url: "/user/cost/buy",
    data: params
  })
};

// 获取协议 
export const getProtocol = (params) => {
  return request.http({
    url: "/config/agreement_ca",
    method: 'GET',
    data: params
  })
};

// 支付
export const getPay = (params) => {
  return request.http({
    url: "/pay/prepay",
    data: params
  })
};

// 获取是否打开支付开关
export const getPaySwitch = (params) => {
  return request.http({
    url: "/config/switch_pay",
    method: 'GET',
    data: params
  })
};

// 获取加入协会金额
export const getJoinOrganizePay = (params) => {
  return request.http({
    url: "/config/price_join_organize",
    method: 'GET',
    data: params
  })
};
// 获取加入活动金额
export const getJoinActivityPay = (params) => {
  return request.http({
    url: "/config/price_join_activity",
    method: 'GET',
    data: params
  })
};