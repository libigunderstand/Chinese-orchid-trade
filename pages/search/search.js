// pages/search/search.js
Page({

  data: {
    current: true,
    tagList: {},
    value: '',
    history: [],
    keylist: []
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
    wx.request({
      url: `http://m.hmlan.com/Search/Association?sort=goods&key=${e.detail.value}`,
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        this.setData({
          keylist: res.data.KeyName
        })
      }
    })
  },
  //删除历史记录
  handleDelete(e) {
    let arr = this.data.history
    arr.splice(e.currentTarget.id,1)
    this.setData({
      history: arr
    })
    wx.setStorageSync('serHistory', this.data.history)
  },
  //清空所有历史记录
  clearHis() {
    this.setData({
      history: []
    })
    wx.clearStorage()
  },
  //点击热门搜索
  toStorage(e) {
    let history = this.data.history
    history.push(e.target.dataset.name)
    wx.setStorageSync('serHistory', history)
    console.log(e.target.dataset.name)
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