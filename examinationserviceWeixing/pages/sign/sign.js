// pages/sign/sign.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signeddata: [],
    src: "../img/123.png",
    ImgWidth: "***",
    ImgHeight: "***",
    ImgType: "***",
    oldLevelboolean: false,
    oldlevel: ["未选择", "初级", "中级", "高级"],
    olditem: ["未选择"],
    signlevel: ["未选择", "初级", "中级", "高级"],
    signitem: ["未选择"],
    oldlevelvalue: 0,
    olditemvalue: 0,
    signlevelvalue: 0,
    signitemvalue: 0,
    college: ['未选择', '计算机与通信工程学院', '信息与控制工程学院', '化学化工与环境学部', '石油天然气工程学院'],
    collegevalue: 0,
    major: ['未选择', '算机', '数媒', '软件', '通信'],
    majorvalue: 0,
    borndate: '1998-01-01',
    oldleveldate: '2017-06-01',
    level_select: '未选择',
    item_select: '未选择',
    value: [0, 0],
    idcard: '0',
    imgok:false,
    ImgSize:0
  },

  /**
      * 选择报名类型 数据根据事件改变
      */
  changelevel: function (e) {
    var item = [['未选择'], ['未选择',
      '信息处理技术员',
      '网络管理员',
      '程序员'
    ],
    ['未选择', '信息系统监理师',
      '系统集成项目管理工程师',
      '电子商务设计师',
      '嵌入式系统设计师',
      '网络工程师',
      '软件评测师',
      '软件设计师'],
    ['未选择']
    ];
    this.setData({
      signitem: item[e.detail.value],
      signlevelvalue: e.detail.value,
    });
  },

  changeitem: function (e) {
    this.setData({
      signitemvalue: e.detail.value,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  
  //提交报名数据
  sign: function (e) {

    //以前级别信息获取
    var oldLevel = this.data.oldlevel[e.detail.value.oldLevel]
      + " " + this.data.olditem[e.detail.value.oldClass];
    var oldDate = e.detail.value.oldDate;

    //现在级别信息获取
    var nowLevel = this.data.signlevel[e.detail.value.nowLevel]
    var nowClass = this.data.signitem[e.detail.value.nowClass];

    //专业学院获取
    var college = this.data.college[e.detail.value.college];
    var major = this.data.college[e.detail.value.major];

    if (e.detail.value.oldTest == false) {
      oldLevel = "none";
      oldDate = '3333-11-30'
    }
    if (e.detail.value.name.length == 0) {
      wx.showModal({
        title: '提示',
        content: '姓名不能为空',
        showCancel: false,
        success: function (res) {
        }
      })
    } else if (e.detail.value.college.length != 1) {
      wx.showModal({
        title: '提示',
        content: '请选择学院',
        showCancel: false,
        success: function (res) {
        }
      })
    } else if (e.detail.value.major.length != 1) {
      wx.showModal({
        title: '提示',
        content: '请选择专业名称',
        showCancel: false,
        success: function (res) {
        }
      })
    } else if (e.detail.value.className.length == 0) {

      wx.showModal({
        title: '提示',
        content: '班级名为空',
        showCancel: false,
        success: function (res) {
        }
      })
    } else if (e.detail.value.studentId.length == 0) {

      wx.showModal({
        title: '提示',
        content: '学号不能为空',
        showCancel: false,
        success: function (res) {
        }
      })
    } else if (e.detail.value.idCard.length == 0) {

      wx.showModal({
        title: '提示',
        content: '身份证号为空',
        showCancel: false,
        success: function (res) {
        }
      })
    } else if (e.detail.value.tel.length == 0) {

      wx.showModal({
        title: '提示',
        content: '请填写电话号码',
        showCancel: false,
        success: function (res) {
        }
      })
    } else if (e.detail.value.email.length == 0) {

      wx.showModal({
        title: '提示',
        content: '邮箱不能为空',
        showCancel: false,
        success: function (res) {
        }
      })
    } else if (e.detail.value.oldTest == true && e.detail.value.oldLevel.length == 0) {
      wx.showModal({
        title: '提示',
        content: '去年级别不能为空',
        showCancel: false,
        success: function (res) {
        }
      })
    }
    else if (e.detail.value.email.length == 0 && e.detail.value.oldLevel.length == 0) {

      wx.showModal({
        title: '提示',
        content: '邮箱不能为空',
        showCancel: false,
        success: function (res) {
        }
      })
    } else {
      var that = this;
      wx.showLoading({
        title: '加载中',
      })
      //提交表单
      wx.request({
        url: getApp().globalData.ip + '/sign',
        data: {
          name: e.detail.value.name,
          college: college,
          major: major,
          className: e.detail.value.className,
          studentId: e.detail.value.studentId,
          idCard: e.detail.value.idCard,
          bornDate: e.detail.value.bornDate,
          tel: e.detail.value.tel,
          email: e.detail.value.email,
          oldTest: e.detail.value.oldTest,
          oldLevel: oldLevel,
          oldDate: oldDate,
          nowLevel: nowLevel,
          nowClass: nowClass
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/json'
        },// 设置请求的 header
        success: function (res) {
          //获取时间 
          var date = new Date();
          var Y = date.getFullYear();
          //月  
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
          //日  
          var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
          console.log(res.data.data.state)
          var temp = that.data.signeddata;
          temp.unshift({ name: e.detail.value.name, studentId: e.detail.value.studentId, date: Y + "-" + M + "-" + D, state: res.data.data.state });
          wx.setStorage({
            key: "signeddata",
            data: temp
          })

          wx.hideLoading()
          wx.navigateTo({
            url: '../msg/msg_success',
          })

        },
        fail: function () {
          wx.hideLoading()
          wx.navigateTo({
            url: '../msg/msg_fail',
          })
        }
      })
    }


  },
  /**
   * 选择器
   */

  //college
  getcollege: function (e) {
    var majors = [
      ['未选择', '算机1', '数媒1', '软件1', '通信1'],
      ['未选择', '算机2', '数媒2', '软件2', '通信2'],
      ['未选择', '算机3', '数媒3', '软件3', '通信3'],
      ['未选择', '算机4', '数媒4', '软件4', '通信4']];
   

    this.setData({
      collegevalue: e.detail.value
    })
    this.setData({
      major: majors[this.data.collegevalue]
    })
  },


  //major
  getmajor: function (e) {
    this.setData({
      majorvalue: e.detail.value
    })
  },

  //borndate

  getborndate: function (e) {
    this.setData({
      borndate: e.detail.value
    })
  },

  //leveldate
  getoldleveldate: function (e) {
    this.setData({
      oldleveldate: e.detail.value
    })
  },

  /**
   * oldleveldata
   */
  changeswitch: function (e) {
    if (e.detail.value == true) {
      this.setData({
        oldLevelboolean: true
      });
    } else {
      this.setData({
        oldLevelboolean: false
      });
    }
  },

  /**
     * chosseImage
     */
  choose: function () {
   if(this.data.idcard.length == '18'){
     wx:wx.showModal({
       title: '提示',
       content: '请您先填写正确的身份证号码',
       showCancel: false,
     })
   }else{
     var that = this;
     wx.chooseImage({
       count: 1,
       sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
       sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
       success: function (res) {
         // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
         var tempFilePaths = res.tempFilePaths;
         //检查照片信息
         wx.getImageInfo({
           src: tempFilePaths[0],
           success: function (res) {
             // console.log(res)
             that.setData({
               src: tempFilePaths,
               ImgWidth: res.width,
               ImgHeight: res.height,
               ImgType: res.type
             });
             console.log(that.data.ImgWidth + "   " + that.data.ImgHeight)
             if (that.data.ImgWidth >= 295 && that.data.ImgHeight >= 413) {
               if (that.data.ImgType == "jpg" || that.data.ImgType == "jpeg") {
                 //选择图片后立即上传得到图片信息 核验大小
                 wx.uploadFile({
                   url: getApp().globalData.ip + '/getImageData',
                   filePath: tempFilePaths[0],
                   name: 'file',
                   formData: {
                     idcard: that.data.idcard
                   },
                   success: function (res) {
                     var data = JSON.parse(res.data);
                     console.log(data)
                     if (data.data.size<60){
                        that.setData({
                          imgok:true,
                          ImgSize:data.data.size
                        });
                     }else{
                       wx: wx.showModal({
                         title: '错误',
                         content: '您的照片大小为' + data.data.size+"k不符合要求的30-60k",
                         showCancel: false,
                       })
                     }
                   }

                 })
               } else {
                 wx: wx.showModal({
                   title: '错误',
                   content: '照片格式需为jpg，而不是' + that.data.ImgType,
                   showCancel: false,
                 })
               }
             } else {
               wx: wx.showModal({
                 title: '错误',
                 content: '照片像素应该大小大于295*413',
                 showCancel: false,
               })
             }









           }
         });
       }
     })
   }
  },

  /**
     * 选择报名类型 数据根据事件改变
     */
  changeoldlevel: function (e) {
    var item = [['未选择'], ['未选择',
      '信息处理技术员',
      '网络管理员',
      '程序员'
    ],
    ['未选择', '信息系统监理师',
      '系统集成项目管理工程师',
      '电子商务设计师',
      '嵌入式系统设计师',
      '网络工程师',
      '软件评测师',
      '软件设计师'],
    ['未选择']
    ];
    this.setData({
      olditem: item[e.detail.value],
      oldlevelvalue: e.detail.value,
    });
  },

  changeolditem: function (e) {
    this.setData({
      olditemvalue: e.detail.value,
    });
  },

  getidcard: function (e) {
    // console.log(e.detail.value)
    this.setData({
      idcard: e.detail.value
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
          signeddata: res.data
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