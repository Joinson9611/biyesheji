// pages/index/index.js
// 连接数据库
const db = wx.cloud.database()
//获取全局app
let app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../images/swiper/1.jpg',
      '../../images/swiper/2.jpg',
      '../../images/swiper/3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    sort: [{
      keyword: '旧书',
      iconPath: '../../images/sort/books.png'
    },{
      keyword: '旧物',
      iconPath: '../../images/sort/thing.png'
    },
    {
      keyword: '免费',
      iconPath: '../../images/sort/free.png'
    },
    {
      keyword: '其他',
      iconPath: '../../images/sort/others.png'
    }
    ],
    detail: []
  },
  query() {
  },
  //跳转详情页面
  goDetail(e) {
    let that = this;
    let data = JSON.stringify(e.currentTarget.dataset.info);   
    console.log(e);
    wx.navigateTo({
      url: '../details/details?data=' + data 
    })  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    db.collection('publish_Info').get({
      success(res) {
        console.log(res.data) 
        that.setData({
          detail: that.data.detail.concat(res.data)
        });       
      }
    });   
  }

})