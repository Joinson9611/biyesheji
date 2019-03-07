Page({

  /**
   * 页面的初始数据
   */
  data: {
    will:[
      { name: '1', value: '出售' , checked: true},
      { name: '2', value: '购买'}
    ],
    sort: [
      { name: '1', value: '旧书' },
      { name: '2', value: '旧物' },
      { name: '3', value: '免费' },
      { name: '4', value: '其他', checked: true },
    ],
    images: [],
    category: "",
    content: ""
  },

  //单选框选择事件
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.setData({
      category: e.detail.value
    })
  },

  //上传图片
  chooseImage() {
    var that = this;
    if (this.data.images.length < 3) {
      wx.chooseImage({
        sizeType: ['original', 'compressed'],
        success: function (res) {
          that.setData({
            images: that.data.images.concat(res.tempFilePaths)
          })
        }
      })
    } else {
      wx.showToast({
        title: '最多上传三张图片',
        icon: 'loading',
        duration: 3000
      });
    }
  },

  // 删除图片
  deleteImg: function (e) {
    var imgs = this.data.images;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      images: imgs
    });
  },
  //失去焦点时获取输入框内容
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
    this.setData({
      content: e.detail.value,
    })
  },
  //失物招领表单的提交
    msgFormSubmit(e) {
    var category = this.data.category;
    var content = this.data.content;

    //test
    console.log("category:" + category);
    console.log("content:" + content);
    var images = this.data.images;
    for (var i = 0; i < images.length; i++) {
      console.log("图片地址：" + images[i]);
    }
    this.setData({
      images: []
    });
    wx.showToast({
      title: '发布成功',
      duration: 2000
    })
  },
  //菜单导航栏的跳转
  handleChange(e) {
    const index = e.detail.value;
    console.log(e);
    console.log("value: " + e.detail.value);
    switch (index) {
      case 0:
        wx.redirectTo({
          url: '/pages/lostandfound/lostandfound',
        })
        break;
      case 1:
        // wx.navigateTo({
        //   url: '/pages/send/send',
        // })
        break;
      case 2:
        wx.redirectTo({
          url: '/pages/find/find',
        })
        break;
      case 3:
        wx.redirectTo({
          url: '/pages/userMsg/userMsg',
        })
        break;
    }
  },
  handleSelected() {
    this.setData({
      index: 2,
    });
  },
  handleClick(e) {
    const { index, title } = e.detail;
    console.log('点击了tab:' + index, title);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  }

})
