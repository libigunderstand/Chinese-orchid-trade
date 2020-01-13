// pages/attention/attention.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    list:[]
  },

  getDatas(pageNo){
    var that = this
    wx.request({
      url: 'https://m.hmlan.com/Member/Attention/ListTuiShopAuctions?&page={{page}}&pagesize',
      data: {
        page: pageNo
      },
      header: {
        'content-type': 'application/json'
      },
      success (res) {
        that.setData({
          page: pageNo+1,
          list: that.data.list.concat(res.data)
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDatas(this.data.page)
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
    this.getDatas(this.data.page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})