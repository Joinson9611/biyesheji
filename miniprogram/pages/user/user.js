// pages/user/user.js

let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {  
    avatarUrl: '../../images/avatar.png',
    nickName: ''   
  },

  /**
   * 生命周期函数--监听页面加载
   */


  onLoad: function (options) {
     
  },
  getInfo(res) {
    let that = this;
    if(res.detail.userInfo) {
      wx.login({
        success(res) {
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: 'wx733ce21de5d4f5f3',
              secret: '97e6a36fb4eaf1febc49e326acc6cc55',
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              app.globalData.openid = res.data.openid;
            }
          })

        }
      })  
      var userInfo = res.detail.userInfo;
      console.log(userInfo.avatarUrl);
      this.setData({
        avatarUrl: userInfo.avatarUrl,
        nickName: userInfo.nickName
      });

    }

  }, 
  goInfo() {
    wx.navigateTo({
      url: '../collection/collection',
    })
  },

})