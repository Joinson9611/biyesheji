// 连接数据库
const db = wx.cloud.database()
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list:[],
  },
  remove(e) {
    let that = this;
    let dataset = e.currentTarget.dataset;
    let _openid = dataset.openid;
    let index = dataset.index;
    let _id = dataset.id;
     db.collection('publish_Info').doc(_id).remove(); 
    let list = this.data.list;
    list.splice(index, 1);
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
        console.log(e);
        wx.navigateTo({
          url: '../details/details?data=' + data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this;
    let isLogin = app.globalData.isLogin;
    if (isLogin){
      db.collection('publish_Info').where({
        _openid:app.globalData.openid
      }).get({
        success(res) {
          that.setData({
            list:res.data     
          })
        }
      });
    }
  }
})