wx.cloud.init()
// 获取数据库引用
const db = wx.cloud.database()
let app = getApp();
// pages/admin/admin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:[],
    id:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    this.setData({id:app.globalData.openid})
    let that = this;
    console.log(app.globalData.openid)
    db.collection('publish_Info').where({
      _openid: app.globalData.openid
    }).get({
      success(res) {
        let detail = res.data
        // details = res.data;
        that.setData({
          detail
        });
      }
    });
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