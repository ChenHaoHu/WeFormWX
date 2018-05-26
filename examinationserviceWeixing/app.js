//app.js
App({
  onLaunch: function () {
  },
  getUserInfo: function () {
    var that = this
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {      
              that.globalData.userInfo = res.userInfo
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    ip:"http://localhost:8080"
    // ip:"http://120.78.174.107:8080"
  }
})