
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "",
    imgurl: " ",
    nouserinfor: true,
    userinfor: [],
    niming: false,
    disabledcheckbox: true,
    checkedcheckbox: true,
    textNum:0
  },

  getTextAreaNum:function(e){
    console.log(e.detail.value.length)
    this.setData({
      textNum: e.detail.value.length
    });
  },


  niming: function (e) {
    if (e.detail.value.length == 1) {
      this.setData({
        niming: true
      })
    } else {
      this.setData({
        niming: false
      })
    }
  },

  send: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var niming = this.data.niming;
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        if (userInfo != null) {
          var nickName = userInfo.nickName
          var imgurl = userInfo.avatarUrl

          that.setData({
            nickName: nickName,
            imgurl: imgurl,
          });

          if (niming == true) {
            wx.request({
              url: getApp().globalData.ip +'/addopinion', 
              data: {
                userName: "niming",
                userImg: "niming",
                content: e.detail.value.content,
                label: e.detail.value.label,
                niming: true
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                wx.hideLoading()
                wx.showModal({
                  title: '提示',
                  content: '发送成功',
                  showCancel: false,
                  success: function (res) {
                    wx.switchTab({
                      url: '../opinion/opinion'
                    })
                  }
                })
              }
            })
          } else {
            wx.request({
              url: getApp().globalData.ip +'/addopinion', //仅为示例，并非真实的接口地址
              data: {
                userName: that.data.nickName,
                userImg: that.data.imgurl,
                content: e.detail.value.content,
                label: e.detail.value.label,
                niming: false
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                wx.hideLoading()
                wx.showModal({
                  title: '提示',
                  content: '发送成功',
                  showCancel: false,
                  success: function (res) {
                    wx.switchTab({
                      url: '../opinion/opinion'
                    })
                  }
                })
              }
            })
          }
        }
      },
      fail: function () {
        wx.request({
          url: getApp().globalData.ip +'/addopinion', //仅为示例，并非真实的接口地址
          data: {
            userName: "niming",
            userImg: "niming",
            content: e.detail.value.content,
            label: e.detail.value.label,
            niming: true
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            wx.hideLoading()
            wx.showModal({
              title: '提示',
              content: '发送成功',
              showCancel: false,
              success: function (res) {
                wx.switchTab({
                  url: '../opinion/opinion'
                })
              }
            })
          }
        })
        wx.hideLoading()
      }
    })


  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this


  wx:wx.getSetting({
    success: function(res) {
      if (res.authSetting['scope.userInfo']) {
        that.setData({
          disabledcheckbox: false,
          checkedcheckbox: false
        });

      }else{
        wx.showToast({
          title: '处于匿名状态',
          icon: 'success',
          duration: 2000
        })
      }

    },
    fail: function(res) {},
    complete: function(res) {},
  })
  }
})