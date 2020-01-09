// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: true,
    tagList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://m.hmlan.com/Search/HotSearchKey?sort=goods',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        this.setData({
          tagList: res.data.KeyName,
        })
        console.log(this.data.tagList )
      }
    })
  },
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this.data.tagList)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})