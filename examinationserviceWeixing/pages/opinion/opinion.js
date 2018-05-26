var app = getApp();

// pages/opinion/opinion.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choose: 0,

    questions: [
      { ques: "软考的试题是否很难？合格率如何？", answer: "软考属于专业水平的国家品牌考试，试题注重岗位知识和技能（不是背书），综合性和灵活性强，创意多。但只要考生掌握了相应岗位所需的基本知识和技能，就会认为考试并不难。对于死记硬背书本的人来说，可能就比较难。由于考试向社会开放，不设学历资历条件，知识和能力各个科目都及格才能合格，因此合格率并不高。各级别总平均合格率大约是25%，初级资格的合格率约40%，中级资格的合格率20-30%，高级资格的合格率约20%。社会开放考试的报考者中水平差异很大，不象学校考试那样大家水平比较接近。认证培训，27位软考教研专家，顶级软考名师授课，独创项目化思维培训体系，体验二八定律学软考氛围，备考学习计划私人定制。在光环学习软考，能将项目管理知识与IT技术结合，一次学习，终身受用！" },
      { ques: "软考成绩何时通知？", answer: "软考成绩将在考试结束后2个月左右，由各地软考办通知考生。有的地方提供声讯台服务，有的地方可以电话查询，一般都会寄发成绩通知单。将会提前通知学员查询成绩。" },
      { ques: "软考合格颁发什么样的证书？", answer: "软考成绩公布3个月后，各地软考办将陆续向合格者颁发《中华人民共和国计算机技术与软件专业技术资格(水平)证书》。该证书由国家国家人力资源和社会保障部统一印制，由国家人力资源和社会保障部、工业和信息化部盖章。随同证书一起颁发的还有一张参加全国统一专业技术资格考试的登记表，该表由当地人力资源和社会保障部门盖章，提供给用人单位存入考生个人档 案。证书中的内容用中、英两种文字书写，证书上的管理号是合格者的全国统一编号。" },
      { ques: "软考证书有什么效力？", answer: "根据国人部发[2003]39号文件，通过考试并获得相应级别计算机技术与软件专业技术资格(水平)证书的人员，表明其已具备从事相应专业岗位工作的水平和能力，用人单位可根据《工程技术人员职务试行条例》有关规定和工作需要，从获得资格(水平)证书的人员中择优聘任相应专业技术职务。取得初级资格可聘任技术员或助理工程师职务；取得中级资格可聘任工程师职务；取得高级资格，可聘任高级工程师职务。由于计算机软件资格考试在国内外的知名度很高，有些级别实现了中日和中韩互认，大大提高了持证者的就业竞争力。北京积分落户的政策备受关注，81.6%北京受访者认为北京积分落户门槛高，在学习软考，轻松解除门槛，助你一步到位，领取北京居住证！" },
    ],

    opinions: [],
    page: 1

  },

  lookmore: function (e) {

    wx.navigateTo({
      url: '../opiniondetail/opiniondetail?id=' + e.currentTarget.id
    })
  },
  add: function () {

    wx: wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '../send/send',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        } else {
          wx.navigateTo({
            url: '../notice/notice',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
      },
    })

  },

  //被选择
  choose: function () {
    var a = this.data.choose;

    this.setData({
      choose: (a + 1) % 2
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // questions
    wx: wx.request({
      url: getApp().globalData.ip + '/getproblemlist',
      data: {
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res.data)
        that.setData({
          questions: res.data.data
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
    var that = this;
    wx.request({
      url: getApp().globalData.ip + '/getopinionbypage',
      data: {
        page: 0
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var temp = [];
        for (var i = 0; i < res.data.data.length; i++) {
          var date = res.data.data[i].date;
          date = date.slice(1, 20)
          // console.log(date)
          temp.unshift({ id: res.data.data[i].opinionid, iconUrl: res.data.data[i].userImg, name: res.data.data[i].userName, intro: res.data.data[i].label, contain: res.data.data[i].content, date: date, supportnum: res.data.data[i].supportNum, commentNum: res.data.data[i].commentNum })
        }

        that.setData({
          opinions: temp,
          page: that.data.page + 1
        });
      }
    })
  },
  bindscrolltolower: function () {
    var that = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.request({
      url: getApp().globalData.ip + '/getopinionbypage',
      data: {
        page: that.data.page
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var temp = that.data.opinions;
        if (res.data.data.length == 0) {
          wx.showModal({
            title: '提示',
            content: '已经刷到最低下拉',
          })
        } else {
          for (var i = 0; i < res.data.data.length; i++) {
            var date = res.data.data[i].date;
            date = date.slice(1, 20)
            temp.unshift({ id: res.data.data[i].opinionid, iconUrl: res.data.data[i].userImg, name: res.data.data[i].userName, intro: res.data.data[i].label, contain: res.data.data[i].content, date: date, supportnum: res.data.data[i].supportNum, commentNum: res.data.data[i].commentNum })
          }
          console.log(temp)
          that.setData({
            opinions: temp,
            page: that.data.page + 1
          });
        }
      }
    })
    wx: wx.hideNavigationBarLoading()
  }

})