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
        isNoData: false,
        UserId: null,
        isFixed: false

    },

    // 加载数据
    handleLoadList(opts = {}) {
        const that = this;
        wx.request({
            url: "http://m.hmlan.com/Auction/GetListAuctionP",
            data: {
                page: that.data.page,
                pageSize: that.data.pageSize,
                SellerId: that.data.UserId,
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
        const UserId = options.UserId;
        that.static = {};
        that.setData({
            UserId
        });
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
                wx.setNavigationBarTitle({
                    title: res.data.ShopItem.ShopName
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
    onReady() {
        // const query = wx.createSelectorQuery();
        // query.select(".list-nav").boundingClientRect(function(res) {
        //     console.log(res);
        // });
        // query.exec();
        // const that = this;
        // wx.createIntersectionObserver(this)
        //     .relativeToViewport({ top: -40 })
        //     .observe(".list-nav", (e) => {
        //         that.setData({
        //             isFixed: e.intersectionRatio <0.01
        //         });
        //     });
    },

    onPageScroll(e) {
        if (e.scrollTop > 215 !== this.data.isFixed) {
            this.setData({
                isFixed:!this.data.isFixed
            })
        }
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
