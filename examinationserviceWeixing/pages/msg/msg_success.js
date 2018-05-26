Page({

  toshouye:function(){
    wx.switchTab({
      url: '../main/main'
    })
  },

  cont:function(){
    wx.navigateBack({
      delta: 2,
    })
  }
});