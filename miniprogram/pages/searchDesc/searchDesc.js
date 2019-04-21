// pages/index/index.js
// 连接数据库
const db = wx.cloud.database()
//获取全局app
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    detail:[]
  },
  goDetail(e) {
    let that = this;
    let data = JSON.stringify(e.currentTarget.dataset.info);
    wx.navigateTo({
      url: '../details/details?data=' + data
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    db.collection('publish_Info').where({
      title: db.RegExp({
        regexp: options.val,
        options: 'i'
      })
    }).get({
      success(res) {
        console.log(res)
        let detail = res.data
        for (let i = 0; i < detail.length; i++) {
          switch (detail[i].sort) {
            case '1':
              detail[i].sort = '旧书';
              break;
            case '2':
              detail[i].sort = '旧物';
              break;
            case '3':
              detail[i].sort = '免费';
              break;
            default:
              detail.sort = '其他';
          }
        }
        //设置数据缓存
        wx.setStorage({
          key: 'detail',
          data: res.data
        })
        // details = res.data;
        that.setData({
          detail
        });
      }
    }); 
  }
})
