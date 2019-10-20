const ENV = 0;
const domainName = ["https://api.deyushiyuan.cn/litemall/wx"][ENV];
// const domainName = ["http://192.168.123.218:8082//wx"][ENV];
const app = getApp();

function http(params) {
  let promise = new Promise(function(resolve, reject) {
    wx.request({
      url: params.url.indexOf('http') > -1 ? params.url : domainName + params.url,
      data: params.data,
      method: params.method || "POST",
      header: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'X-Token': wx.getStorageSync('token') || ''
        // 'X-Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0aGlzIGlzIGxpdGVtYWxsIHRva2VuIiwiYXVkIjoiTUlOSUFQUCIsImlzcyI6IkxJVEVNQUxMIiwiZXhwIjoxNTcxNTY4MDc4LCJ1c2VySWQiOjMsImlhdCI6MTU3MTU2MDg3OH0.c8oc3xX1z8-hL7Sc7NEI3lkgqa_egLI3Gf3wJZb17vw'
      },
      success: function(res) {
        if (res.data.errno === 0) {
          console.log("返回结果：", res.data);
          resolve(res.data);
        } else if (res.data.errno === 501) {
          wx.clearStorage()
          wx.reLaunch({
            url: "/pages/guide/guide"
          });
          wx.hideLoading();
        } else {
          wx.showToast({
            icon: '',
            title: res.data.errmsg,
          })
          wx.hideLoading();
          // wx.showModal({
          //   title: "提示",
          //   content: `状态码：${res.data.errno},${res.data.errmsg}`,
          //   success(res) {
          //     if (res.confirm) {
          //       wx.clearStorage()
          //       wx.reLaunch({
          //         url: "/pages/guide/guide"
          //       });
          //     } else if (res.cancel) {
          //       console.log("用户点击取消");
          //     }
          //   }
          // });
        }
      },
      fail: function(e) {
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