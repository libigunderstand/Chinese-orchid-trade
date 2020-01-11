// pages/goodsdetail/goodsdetail.js
Page({
  data: {
    totaldata: {},
    currentPoint: 1,
    iflike: false
  },
  //轮播图当前页数值切换
  current(e) {
    this.setData({
      currentPoint: e.detail.current + 1
    })
  },
  toHome() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  back() {
    wx.navigateBack({})
  },
  //收藏取消
  like() {
    this.setData({
      iflike: !this.data.iflike
    })
  },
  onLoad: function (options) {
    console.log(options.id)
    wx.request({
      url: `http://m.hmlan.com/Auction/GetAuctionItem?AucId=${options.id}`,
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        this.setData({
          totaldata: res.data
        })
        console.log(this.data.totaldata)
      }
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
})