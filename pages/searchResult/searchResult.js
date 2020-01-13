// pages/searchResult/searchResult.js
Page({

  data: {
    titleValue: ''
  },
  back() {
    wx.navigateBack({})
  },
  sou() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  onLoad: function (options) {
    console.log(options.goodsName)
    this.setData({
      titleValue: options.goodsName
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
})