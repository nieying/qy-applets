import request from "../../utils/request";

const AppId = "wx84aa4b7c0fc9c4ca"; // 微信appid
const SessionKey = "5579ce3a448b0ea85bfd5c6ff0e73919"; // 微信秘钥（微信后台秘钥保存好、刷新会重新生成)

// 授权
export const login = params => {
  return request.http({
    url: "/auth/login_by_weixin",
    data: params
  })
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