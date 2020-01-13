Page({
    data: {
        userInfo: null,
        commentList: [],
        selectTypeIndex: 0,
        isNoMoreData: false,
        isNoData: false,
        isReachBottom: false,
        RaBisnesType:2
    },
    handleLoadComment(opts = {}, cbfn) {
        const that = this;
        wx.request({
            url: "http://m.hmlan.com/Rate/GetRateListP",
            data: {
                ...that.loadParams,
                ...opts
            },
            success(res) {
                if (that.data.isNoData || that.data.isNoMoreData) return;
                let list = res.data.RateListP;
                let commentList = that.data.commentList;
                let page = that.loadParams.page;
                let pageSize = that.loadParams.pageSize;

                if (!list && page == 1) {
                    that.setData({
                        isNoData: true
                    });
                    return;
                }
                if (list.length < pageSize) {
                    that.setData({
                        isNoMoreData: true
                    });
                }
                that.setData(
                    {
                        commentList: commentList.concat(list)
                    },
                    () => {
                        if (cbfn) cbfn();
                        that.loadParams.page++;
                    }
                );
            }
        });
    },
    handleSelectType(e) {
        let RaType = e.currentTarget.dataset.ratype;
        this.setData({
            selectTypeIndex: RaType,
            commentList: [],
            isNoData: false,
            isNoMoreData: false
        });
        this.loadParams.page = 1;
        this.loadParams.RaType = RaType;
        this.handleLoadComment();
    },

    onLoad: function (options) {
        const that = this;
        let { UserId, RaBisnesType } = options;
        wx.setNavigationBarTitle({
            title: RaBisnesType == 2 ? "卖家信用评价" : "买家信用评价"
        });
        that.loadParams = {
            UserId: UserId,
            page: 1,
            pageSize: 20,
            IsOut: false,
            RaBisnesType: RaBisnesType,
            RaType: 0
        };
        that.setData({
            RaBisnesType
        });
        wx.request({
            url: "http://m.hmlan.com/User/RateInfo?userId=" + UserId,
            success(res) {
                that.setData({
                    userInfo: res.data.Rates
                });
            }
        });
        that.handleLoadComment();
    },
    onReachBottom() {
        if (this.data.isReachBottom) return;
        this.setData({
            isReachBottom: true
        });
        this.handleLoadComment({}, () => {
            this.setData({
                isReachBottom: false
            });
        });
    }
});
