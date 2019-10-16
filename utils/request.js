const ENV = 0;
const domainName = ["https://api.deyushiyuan.cn/litemall/wx"][ENV];
const app = getApp();

function http(params) {
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: params.url.indexOf('http') > -1 ? params.url : domainName + params.url,
      data: params.data,
      method: params.method || "POST",
      header: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'X-Token': wx.getStorageSync('token') || ''
      },
      success: function (res) {
        if (res.data.errno !== 0) {
          wx.showModal({
            title: "提示",
            content: `状态码：${res.data.errno},${res.data.errmsg}`,
            success(res) {
              if (res.confirm) {
                wx.clearStorage()
                wx.reLaunch({
                  url: "/pages/guide/guide"
                });
              } else if (res.cancel) {
                console.log("用户点击取消");
              }
            }
          });
          wx.hideLoading();
        } else {
          console.log("返回结果：", res.data);
          resolve(res.data);
        }
      },
      fail: function (e) {
        wx.showToast({
          title: e,
        })
        reject(e)
      }
    });
  });
  return promise;
}
module.exports = {
  http: http
};