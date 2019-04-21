// pages/user/user.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {  
    oid: '',
    avatarUrl: '../../images/avatar.png',
    nickName: '',
    list:[
      {
        imgUrl: '../../images/user/mylove.png',
        title: '我的收藏',
        goUrl: '../collection/collection'
      },
      {
        imgUrl: '../../images/user/sale.png',
        title: '我的出售',
        goUrl: '../mysell/mysell'       
      },
      {
        imgUrl: '../../images/user/order.png',
        title: '我的订单',
        goUrl: '../order/order'
      },
      {
        imgUrl: '../../images/user/service.png',
        title: '联系客服',
        goUrl: '../admin/admin'      
      }
    ]   
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
          app.globalData.isLogin = true;
          that.getOpenid()
        }
      })  
      var userInfo = res.detail.userInfo;
      this.setData({
        avatarUrl: userInfo.avatarUrl,
        nickName: userInfo.nickName
      });
    }
  }, 
  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        var openid = res.result.openid;
        app.globalData.openid = res.result.openid
      }
    })
  },
  goInfo(e) {
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url
    })
  }
})