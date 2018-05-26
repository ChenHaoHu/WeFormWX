// pages/team/team.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    team:[
      
    ],
    id:"0",
    title:"撩月团队",
    data:"欢迎使用由辽宁石油化工大学计算机与通信工程学院学生开发的啃芝士微信小程序，其中包括考试报名，资料分享，看法分析等模块，撩月团队真诚的希望您能多发表自己的观点和看法，让我们一起构建一个良好的辽石化考试经验交流环境。",
    job:"Try our best!"
  },

  /**
   * next
   */

  next:function(e){
    var i = this.data.team.length;
    var id = e.currentTarget.id
    id = (parseInt(id)+1)%4
    this.setData({
      id:id,
      title: this.data.team[id].name, 
      data: this.data.team[id].intro,
      job: this.data.team[id].job
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that = this
    wx:wx.request({
      url: getApp().globalData.ip + '/team/getteamdata',
      success: function(res) {
       that.setData({
         team:res.data.data
       });
      }
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