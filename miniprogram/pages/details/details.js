// 获取云能力
wx.cloud.init()
// 获取数据库引用
const db = wx.cloud.database()
Page({
  data: {
    isLike: true,
    // banner
    imgUrls: [
    ],
    info: null,
    isLike:false
  },
  //预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },
  goBuy() {
    wx.navigateTo({
      url: '../order/order',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 收藏加入
  addLike() {
    let that = this;
    let data = that.data;
    this.setData({
      isLike: !this.data.isLike
    });
    console.log(data._id);
    db.collection('collection').add({
      data: {
        cid: data.info._id,
        isLike: data.isLike,
        title: data.info.title,
        time: data.info.time,
        will: data.info.will,
        price: data.info.price,
        fileID: data.info.fileID
      },
      success() {
        wx.showToast({
          title: '加入成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  onLoad: function(options) {
    let info = JSON.parse(options.data);
    console.log(info);
    if (info.will == '0') {
      info.will = '出售'
    }
    else {
      info.will = '收购'
    }
    switch (info.sort) {
      case '1':
        info.sort = '旧书';
        break;
      case '2':
        info.sort = '旧物';
        break;
      case '3':
        info.sort = '免费';
        break;
      default:
        info.sort = '其他';
    }
    this.setData({
      info: info
    })
  }
})
