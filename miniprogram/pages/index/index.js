// pages/index/index.js
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
    ]
  },
  query() {
    console.log("搜索");
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  }

})