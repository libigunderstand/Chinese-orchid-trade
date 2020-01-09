// pages/search/search.js
Page({

  data: {
    current: true,
    tagList: {},
    value: '',
    history: []
  },
  onLoad: function (options) {
    this.initHistory()
    wx.request({
      url: 'http://m.hmlan.com/Search/HotSearchKey?sort=goods',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        this.setData({
          tagList: res.data.KeyName,
        })
      }
    })
  },
  //点击tab标签切换时请求数据
  currentTab() {
    this.setData({
      current: !this.data.current
    })
    wx.request({
      url: `http://m.hmlan.com/Search/HotSearchKey?sort=${this.data.current ? 'goods' : 'shop'}`,
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        this.setData({
          tagList: res.data.KeyName
        })
      }
    })
  },
  //页面加载时获取本地历史记录
  initHistory() {
    this.setData({
      history: wx.getStorageSync('serHistory') || []
    })
  },
  //点击搜索按钮提交
  inputValue() {
    if(this.data.value !== ''){
      let history = this.data.history
      history.push(this.data.value)
      wx.setStorageSync('serHistory', history)
      this.setData({
        value: ''
      })
    }else {
      wx.showToast({
        title: '请输入搜索关键字',
        icon: 'none',
        duration: 1500
      })
    }
  },
  //获取input框value
  formValue(e) {
    this.setData({
      value: e.detail.value
    })
  },
  //删除历史记录
  handleDelete(e) {
    let arr = this.data.history
    arr.splice(e.currentTarget.id,1)
    this.setData({
      history: arr
    })
    wx:wx.setStorageSync('serHistory', this.data.history)
  },
  //清空所有历史记录
  clearHis() {
    this.setData({
      history: []
    })
    console.log(this.data.history)
    wx.clearStorage()
  },
  toHome() {
   wx.switchTab({
     url: '/pages/index/index',
   })
  },
  onReady: function () {
  },
  onShow: function () {

  }
})