// pages/collection/collection.js
// 获取云能力
wx.cloud.init()
// 获取数据库引用
const db = wx.cloud.database()
let app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    isLogin: null
  },
  cancel (e){
    let dataset = e.currentTarget.dataset;
    let _id = dataset.id;
    let index = dataset.index;
    db.collection('collection').doc(_id).remove();
    let list = this.data.list;
    list.splice(index,1);
    this.setData({
      list
    });
  },
  goDetail(e) {
    let _id = e.currentTarget.dataset.id;
    let that = this;
    db.collection('publish_Info').doc(_id).get({
      success(res) {
        let data = JSON.stringify(res.data);
        wx.navigateTo({
          url: '../details/details?data=' + data
        })      
      }
    })
  },
  onShow: function () {
    let isLogin = app.globalData.isLogin
    let that = this;
    if (isLogin){
      db.collection('collection').where({
        _openid: app.globalData.openid
      }).get({
        success(res) {
          that.setData({
            list:res.data
          })
        }
      })
    }
  }
})