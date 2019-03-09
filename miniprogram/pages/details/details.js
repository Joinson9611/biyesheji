Page({
  data: {
    isLike: true,
    // banner
    imgUrls: [

    ],
    info: null
  },
  //预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },
  // 收藏
  addLike() {
    this.setData({
      isLike: !this.data.isLike
    });
  },
  // 立即购买
  contactSellery() {
    wx.showToast({
      title: '购买成功',
      icon: 'success',
      duration: 2000
    });
  },
  onLoad: function(options) {
    let info = JSON.parse(options.data);
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
