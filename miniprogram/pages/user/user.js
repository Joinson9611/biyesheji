// pages/user/user.js

var app = getApp();
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
    if(res.detail.userInfo) {
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
  }

})