// 获取云能力
wx.cloud.init()
// 连接数据库
const db = wx.cloud.database()
//引入公共代码
const util = require('../../utils/util.js');
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
    images: []
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
    let that = this;
    if (this.data.images.length < 3) {
      wx.chooseImage({
        sizeType: ['original', 'compressed'],
        success: function (res) {
          // wx.showLoading({
          //   title: '上传中'
          // });
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
  //表单的提交
    msgFormSubmit(e) {
    let that = this;
    let value = e.detail.value;
    let time = util.formatTime(new Date());
    console.log(time);
    //产生随机值
    let imgUrl = this.data.images[0];
    if(imgUrl) {
      const name = Math.random() * 100000;
      const cloudPath = name + imgUrl.match(/\.[^.]+?$/)[0];
      wx.cloud.uploadFile({
        // 指定上传到的云路径
        cloudPath,
        // 指定要上传的文件的小程序临时文件路径
        filePath: imgUrl,
        // 成功回调
        success: res => {
          db.collection("publish_Info").add({
            data: {
              will: value.will,
              title: value.title,
              time,
              sort: value.sort,
              price: value.price,
              content: value.content,
              contact: value.contact,
              fileID: res.fileID
            }
          })
        },
        fail: function () {
          wx.showToast({
            title: '上传失败',
            'icon': 'none',
            duration: 3000
          })
        }
      }); 
    }else{
      db.collection("publish_Info").add({
        data: {
          will: value.will,
          time,
          title: value.title,
          sort: value.sort,
          price: value.price,
          content: value.content,
          contact: value.contact,
          fileID: ''
        }
      })
    };  
    this.setData({
      images: []
    });
    wx.showToast({
      title: '发布成功',
      duration: 2000
    })
  },
  //提交数据库
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
