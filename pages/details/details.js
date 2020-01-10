// pages/details/details.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        ShopItem: null,
        RateInfo: null,
        Page: 1,
        pageSize: 20,
        UserId: "16ffaf478ab79d5f22bff313bbaecf55",
        list: [],
        selectIndex: 0
    },

    handleLoadList(opts = {}) {
        const that = this;
        wx.request({
            url: "http://m.hmlan.com/Auction/GetListAuctionP",
            data: {
                Page: that.data.Page,
                pageSize: that.data.pageSize,
                SellerId: that.data.UserId,
                ...opts
            },
            success(res) {
                that.setData({
                    list: res.data.ListAuctionP,
                    Page: that.data.Page + 1
                });
            }
        });
  },
  handleItemSelect(e) {
    const that=this
    let { dataset } = e.currentTarget
    that.setData({
      selectIndex: dataset.index,
      page:1
    })
  },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const that = this;
        const UserId = "16ffaf478ab79d5f22bff313bbaecf55";
        wx.hideTabBar();
        wx.showToast({
            title: "数据加载中...",
            icon: "loading"
        });
        wx.request({
            url: `http://m.hmlan.com/Shop/GetShopItem?UserId=${UserId}`,
            success(res) {
                wx.hideToast();
                that.setData({
                    ShopItem: res.data
                });
            }
        });
        wx.request({
            url: "http://m.hmlan.com/User/RateInfo?UserId=" + UserId,
            success(res) {
                wx.hideToast();
                that.setData({
                    RateInfo: res.data.Rates
                });
            }
        });
        that.handleLoadList();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
        wx.showTabBar();
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {}
});
