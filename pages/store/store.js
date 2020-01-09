// pages/store/store.js
Page({

  /**
   * 页面的初始数据
   * page=1&pageSize=20&Loc=%E6%B5%99%E6%B1%9F&OrderStyle=4&IsTui=0
   */
  data: {
    isShow: false,
    page: 1,
    pageSize: 20,
    Loc: "所在地",
    OrderStyle: 0,
    IsTui: 0,
    storeList:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  handleLoadList(opts) {
    const that=this
    wx.request({
      url: "http://m.hmlan.com/Shop/GetShopListP",
      data: {
        ...opts
      },
      success(res) {
        console.log(res);
        that.setData({
          storeList:res.data.ShopListP
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.handleLoadList({page:1,pageSize:20})
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})