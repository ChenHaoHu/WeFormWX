// pages/datadetail/datadetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lesson: { name: "程序员", type: "初级", date: "2018-8-8" },
    filelist: [],
    maxdate:"dsa"
  },

  /**
   * 点击获取文件
   */
  getfile: function (e) {
    console.log(e.currentTarget.id);
    var id = e.currentTarget.id.split("%")[0];
    var fileid = e.currentTarget.id.split("%")[1];
    var filename = this.data.filelist[id].filename
    var data = this.data.filelist[id].url
    wx.showActionSheet({
      itemList: ['预览', '下载'],
      success: function (res) {
        console.log(data)
        //预览
        if (res.tapIndex == 0) {
          wx.showLoading({
            title: '加载中',
          })
          wx.downloadFile({
            url: getApp().globalData.ip + '/downloadfile?fileid=' + fileid,
            // url:"https://www.hcyang.top/11.doc",
            header: {
              'Content-Type': " application/msword"
            },
            success: function (res) {
              console.log(res)
              var filePath = res.tempFilePath
              wx.openDocument({
                filePath: filePath,
                success: function (res) {
                  wx.hideLoading()
                },
                fail: function (res) {
                  wx.showModal({
                    title: '提示',
                    content: '预览失败',
                    showCancel: false,
                    success: function (res) {
                      wx.showModal({
                        title: '失败？不存在的',
                        content: '您请移驾浏览器，链接给您复制好了，直接去复制下载吧',
                        showCancel: false,
                        success: function (res) {
                          wx.setClipboardData({
                            data: getApp().globalData.ip + '/downloadfile?fileid=' + fileid,
                            success: function (res) {
                              wx.showToast({
                                title: '链接准备',
                                icon: 'success',
                                duration: 2000
                              })
                            }
                          })
                        }
                      })
                    }
                  })
                  wx.hideLoading()
                }
              })
            }
          })
        }

        //下载
        if (res.tapIndex == 1) {
          wx.showModal({
            title: '提示',
            content: '下载您请移驾浏览器，链接给您复制好了，直接去复制下载吧',
            showCancel: false,
            success: function (res) {
              wx.setClipboardData({
                data: getApp().globalData.ip + '/downloadfile?fileid=' + fileid,
                success: function (res) {
                  wx.showToast({
                    title: '链接准备',
                    icon: 'success',
                    duration: 2000
                  })
                }
              })
            }
          })

        }
      },
      fail: function (res) {

      }
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //初始化本页展示信息的类型和名字
    var that = this;
    var passdata = options.data;
    console.log(passdata)
    var data = passdata.split("%"); //字符分割 

    //获取时间 
    var date = new Date();
    var Y = date.getFullYear();
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();


    this.setData({
      "lesson.name": data[0],
      "lesson.type": data[1],
      "lesson.date": Y + "-" + M + "-" + D
    });

    wx.request({
      url: getApp().globalData.ip + '/findByStatusAndCategory',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        status: that.data.lesson.type,
        category: that.data.lesson.name
      },
      success: function (res) {
        console.log(res)
        var temp = []
        //time date
        var datesort=[];
        for (var i = 0; i < res.data.data.length; i++) {
          var tt = res.data.data[i].date;
          var date = tt.slice(1,12)
          datesort.push((tt.split("-"))[0].slice(1, 5)+(tt.split("-"))[1] + (tt.split("-"))[2].slice(0,2))
          console.log(datesort)
          temp.push({ id: i, filename: res.data.data[i].name, url: res.data.data[i].data, date:date, fileid: res.data.data[i].fileid });
        }
       //求时间最大值
        var maxdate = datesort[0];
       for (var i = 1; i < datesort.length;i++){
         if (maxdate < datesort[i]){
           maxdate = datesort[i];
         }
       }
       maxdate = maxdate.slice(0, 4) + "-" + maxdate.slice(4, 6) + "-" + maxdate.slice(6, 8)
        that.setData({
          filelist: temp,
          maxdate:maxdate
        });

      },
      fail: function () {
        console.log("ss")
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