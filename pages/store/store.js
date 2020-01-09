// pages/store/store.js
Page({
    data: {
        isShowSelectBar: false,
        isShowLoading: false,
        isGetData: false,
        Loc: null,
        page: 1,
        pageSize: 20,
        OrderStyle: 0,
        IsTui: 0,
        storeList: []
    },

    onLoad: function(options) {},
    handlePullLoading() {
        if (!this.isShowLoading) {
            this.setData({
                isShowLoading: true
            });
            this.handleLoadList();
        }
    },
    handleLoadList(opts = {}) {
        const that = this;
        wx.request({
            url: "http://m.hmlan.com/Shop/GetShopListP",
            data: {
                page: that.data.page,
                pageSize: that.data.pageSize,
                ...opts
            },
            success(res) {
                console.log(1);
                
                const list = that.data.storeList;
                list.push(...res.data.ShopListP);
                that.setData({
                    storeList: list,
                    isGetData: true,
                    isShowLoading: false,
                    page: that.data.page + 1
                });
            }
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        this.handleLoadList();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},

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
