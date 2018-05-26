
Page({

  /**
   * 页面的初始数据
   */
  data: {
    opinionid: 0,
    opiniondata: {},
    zanimg: "../img/support1.png",
    zan: false,
    zannum: 0,
    input: ' ',
    comments: [

    ],
    commentnum: 0
  },
  sendcomment: function () {
    var that = this
    if (that.data.input != '添加评论') {
      wx: wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function (res) {
                var userInfo = res.userInfo
                var nickName = userInfo.nickName
                var imgurl = userInfo.avatarUrl
                console.log(that.data.input)
                wx: wx.request({
                  url: getApp().globalData.ip + '/sendcomment',
                  data: {
                    opinionid: that.data.opinionid,
                    name: userInfo.nickName,
                    iconurl: userInfo.avatarUrl,
                    content: that.data.input
                  },
                  success: function (res) {
                    console.log(res)
                    wx.showToast({
                      title: '成功',
                      icon: 'success',
                      duration: 2000
                    })
                    that.setData({
                      input: " "
                    })
                  },
                })

              }
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '您未授权，所以无法评论，您可以选择去发表观点开启授权',
              showCancel: false,
              success: function (res) {
              }
            })
          }
        },
        fail: function (res) { },
        complete: function (res) {
      
        },
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请您输入内容',
        showCancel: false,
        success: function (res) {
        }
      })
    }
  },

  
  getinput: function (e) {
    this.setData({
      input: e.detail.value
    });
  },

  sendopinion: function () {

  },
  zan: function (e) {
    var that = this;
    var zan = !this.data.zan;
    this.setData({
      zan: zan
    });
    if (zan == true) {
      wx: wx.request({
        url: getApp().globalData.ip + '/addzan',
        data: {
          opinionid: that.data.opinionid
        }
      })
      this.setData({
        zanimg: "../img/support2.png",
        zannum: this.data.zannum + 1
      });
    } else {
      wx: wx.request({
        url: getApp().globalData.ip + '/redzan',
        data: {
          opinionid: that.data.opinionid
        }
      })
      this.setData({
        zanimg: "../img/support1.png",
        zannum: this.data.zannum - 1
      });
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    wx.request({
      url: getApp().globalData.ip + '/findbyopinionid',
      data: {
        opinionid: options.id
      },
      success: function (res) {
        that.setData({
          opinionid: options.id,
          opiniondata: res.data.data[0],
          zannum: res.data.data[0].supportNum
        })
      }
    })


    wx: wx.request({
      url: getApp().globalData.ip + '/findcomments',
      data: {
        opinionid: options.id
      },
      success: function (res) {
        var array = res.data.data
        for (var i = 0; i < array.length; i++) {
          array[i].date = array[i].date.slice(6, 17)
        }

        var temp = [];
        for (var i = 0; i < res.data.data.length; i++) {
          temp.unshift(res.data.data[i])
        }
        that.setData({
          comments: temp,
          commentnum: res.data.data.length
        });
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx: wx.request({
      url: getApp().globalData.ip + '/findcomments',
      data: {
        opinionid: that.data.opinionid
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {

        var array = res.data.data
        for (var i = 0; i < array.length; i++) {
          array[i].date = array[i].date.slice(6, 17)
        }

        var temp = [];

        for (var i = 0; i < res.data.data.length; i++) {
          temp.unshift(res.data.data[i])
        }
        that.setData({
          comments: temp,
          commentnum: res.data.data.length,
          input: " "
        });
        console.log(res)
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})