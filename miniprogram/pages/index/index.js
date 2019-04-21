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
      keyword: '全部'
    },{
      keyword: '旧书'
    },{
      keyword: '旧物'
    },{
      keyword: '免费'
    },{
      keyword: '其他'
    }
    ],
    detail: [],
    val: ''
  },
  getVal(e) {
    let v = e.detail.value
    this.setData({
      val: v
    })
  },
  goSearch() {
    let that = this;
    wx.navigateTo({
      url: '../searchDesc/searchDesc?val=' + that.data.val
    })

  },
  //跳转详情页面
  goDetail(e) {
    let that = this;
    let data = JSON.stringify(e.currentTarget.dataset.info);   
    wx.navigateTo({
      url: '../details/details?data=' + data 
    })  
  },
  tabSelect(e) {
    let that = this;
    let detail = this.data.detail;
    let id = e.currentTarget.dataset.id;
    this.setData({
      TabCur: id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    });
    let type = ''
    switch (id) {
      case 0:
        type = '全部';
        break;
      case 1:
        type = '旧书';
        break;
      case 2:
        type = '旧物';
        break;
      case 3:
        type = '免费';
        break;
      default:
        type = '其他';
    };
    wx.getStorage({
      key: 'detail',
      success: function(res) {
        let list = [];
        let details = res.data
        if (type == '全部') {
          list = details;
        } else {
          for (let i = 0; i < details.length; i++) {
            if (type == details[i].sort) {
              list.push(details[i]);
            }
          }
        }
        that.setData({
          detail: list
        })
      },
    })
    // if (type == '全部') {
    //   list = details;
    // } else {
    //   for (let i = 0; i < details.length; i++) {
    //     if (type == details[i].sort) {
    //       list.push(details[i]);
    //     }
    //   }
    // }
    // that.setData({
    //   detail: list
    // })  
  },
  onShow: function (options) {
    let that = this;
    db.collection('publish_Info').get({
      success(res) { 
        let detail = res.data
        for(let i=0;i<detail.length;i++){
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