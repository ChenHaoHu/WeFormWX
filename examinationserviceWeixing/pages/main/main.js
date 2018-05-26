

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: "0",
    active: '0',
    signeddata:[]
  },
  findgarades:function(){
    wx.showModal({
      title: '提示',
      content: '此功能暂不开放',
      showCancel: false,
    })
  },
  /**
   * 切换卡片的方法
   */
  change: function (e) {
    var index = e.currentTarget.id;
  
    this.setData({
      current: index,
      active: index
    });
  },

  swiperChange: function (e) {
    console.log(e)
    // console.log(e.detail.current)
    this.setData({
      active: e.detail.current
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    app.getUserInfo(function (userInfo) {
      var nickName = userInfo.nickName
      var imgurl = userInfo.avatarUrl
    });
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
    var that = this;
    wx.getStorage({
      key: 'signeddata',
      success: function (res) {
        // console.log(res.data[0].name)
        that.setData({
          signeddata:res.data
        });
      }
    })
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