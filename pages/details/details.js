// pages/details/details.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        ShopItem: null,
        RateInfo: null,
        page: 1,
        pageSize: 20,
        list: [],
        selectIndex: 0,
        selectType: null,
        isReachBottomLoadData: false,
        isNoMoreData: false,
        isNoData: false
    },

    // 加载数据
    handleLoadList(opts = {}) {
        const that = this;
        wx.request({
            url: "http://m.hmlan.com/Auction/GetListAuctionP",
            data: {
                page: that.data.page,
                pageSize: that.data.pageSize,
                SellerId: that.static.UserId,
                ...opts
            },
            success(res) {
                wx.hideToast();
                let list = that.data.list;
                let loadList = res.data.ListAuctionP;
                if (!loadList) {
                    that.setData({
                        isNoMoreData: true
                    });
                    return;
                }
                list = list.concat(loadList);
                that.setData({
                    list,
                    page: that.data.page + 1,
                    isReachBottomLoadData: false
                });
            }
        });
    },

    // 处理选择
    handleItemSelect(e) {
        const that = this;
        wx.showToast({
            title: "数据加载中...",
            icon: "loading"
        });
        let { dataset } = e.currentTarget;
        that.setData(
            {
                selectIndex: dataset.index,
                selectType: dataset.type,
                page: 1,
                list: [],
                isNoMoreData: false
            },
            () => {
                if (dataset.type) {
                    that.handleLoadList({ [dataset.type]: dataset.value });
                } else {
                    that.handleLoadList();
                }
            }
        );
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const that = this;
        const UserId="16ffaf478ab79d5f22bff313bbaecf55"
        that.static={};
        that.static.UserId=UserId;
        wx.setNavigationBarTitle({
            title:options.ShopName
        })
        wx.hideTabBar();
        wx.showToast({
            title: "数据加载中...",
            icon: "loading"
        });
        wx.request({
            url: `http://m.hmlan.com/Shop/GetShopItem?UserId=${UserId}`,
            success(res) {
                that.setData({
                    ShopItem: res.data
                });
            }
        });
        wx.request({
            url: "http://m.hmlan.com/User/RateInfo?UserId=" + UserId,
            success(res) {
                that.setData({
                    RateInfo: res.data.Rates
                });
            }
        });
        that.handleLoadList();
    },
    onReachBottom: function() {
        const that = this;
        let selectType = that.data.selectType;
        if (that.data.isReachBottomLoadData || that.data.isNoMoreData) return;
        that.setData({
            isReachBottomLoadData: true
        });
        if (selectType) that.handleLoadList({ selectType });
        else that.handleLoadList();
    },

    onShareAppMessage: function() {}
});
