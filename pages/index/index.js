Page({
  /**
   * 页面的初始数据
   */
  data: {
    showList: {},
    pageNo: 1,
    bottom: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  toSearch() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  onLoad: function (options) {
    wx.request({
      url: `http://m.hmlan.com/Auction/GetIndexListAuctionP?phoneType=h5&page=${this.data.pageNo}`,
      header: {
        'content-type': 'application/json'
      },
      success: (res)=> {
        this.setData({
          showList: res.data.IndexListAuctionP
        })
      }
    })
  },
  pullUp() {
    console.log(this)
    this.setData({
      pageNo: this.data.pageNo + 1
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: `http://m.hmlan.com/Auction/GetIndexListAuctionP?phoneType=h5&page=${this.data.pageNo}`,
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if(res.data.IndexListAuctionP !== []) {
          this.setData({
            showList: [
              ...this.data.showList,
              ...res.data.IndexListAuctionP
            ]
          })
        }else {
          this.setData({
            bottom: 1
          })
        }
        wx.hideLoading()
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
