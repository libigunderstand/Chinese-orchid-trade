// pages/store/store.js
Page({
    data: {
        isShowSelectBar: false,
        isNoMoreData: false,
        isNoData: false,
        page: 1,
        pageSize: 20,
        Loc: 0,
        IsTui: 0,
        OrderStyle: 0,
        selectType: null,
        storeList: [],
        selectArr: {
            OrderStyle: [
                { name: "综合排序", val: "0", type: 2 },
                { name: "信用度最高", val: "1", type: 2 },
                { name: "信用度最低", val: "2", type: 2 },
                { name: "开店时间短", val: "3", type: 2 },
                { name: "开店时间长", val: "4", type: 2 }
            ],
            IsTui: [
                { name: "全部店铺", val: "0", type: 1 },
                { name: "推荐店铺", val: "1", type: 1 }
            ],
            Loc: [
                { name: "所在地", val: "", type: 0 },
                { name: "浙江", val: "浙江", type: 0 },
                { name: "江苏", val: "江苏", type: 0 },
                { name: "四川", val: "四川", type: 0 },
                { name: "广东", val: "广东", type: 0 },
                { name: "云南", val: "云南", type: 0 },
                { name: "贵州", val: "贵州", type: 0 },
                { name: "福建", val: "福建", type: 0 },
                { name: "重庆", val: "重庆", type: 0 },
                { name: "上海", val: "上海", type: 0 },
                { name: "北京", val: "北京", type: 0 },
                { name: "天津", val: "天津", type: 0 },
                { name: "山东", val: "山东", type: 0 },
                { name: "河南", val: "河南", type: 0 },
                { name: "湖北", val: "湖北", type: 0 },
                { name: "湖南", val: "湖南", type: 0 },
                { name: "安徽", val: "安徽", type: 0 },
                { name: "广西", val: "广西", type: 0 },
                { name: "河北", val: "河北", type: 0 },
                { name: "山西", val: "山西", type: 0 },
                { name: "黑龙江", val: "黑龙江", type: 0 },
                { name: "吉林", val: "吉林", type: 0 },
                { name: "辽宁", val: "辽宁", type: 0 },
                { name: "江西", val: "江西", type: 0 },
                { name: "陕西", val: "陕西", type: 0 },
                { name: "甘肃", val: "甘肃", type: 0 },
                { name: "青海", val: "青海", type: 0 },
                { name: "宁夏", val: "宁夏", type: 0 },
                { name: "内蒙古", val: "内蒙古", type: 0 },
                { name: "西藏", val: "西藏", type: 0 },
                { name: "海南", val: "海南", type: 0 },
                { name: "新疆", val: "新疆", type: 0 },
                { name: "台湾", val: "台湾", type: 0 },
                { name: "香港", val: "香港", type: 0 },
                { name: "澳门", val: "澳门", type: 0 }
            ]
        }
    },
    // 点击遮罩层
    handleTapMsk() {
        this.setData({
            isShowSelectBar: false
        });
    },
    // 点击分类逻辑
    handleSelectType(e) {
        let index = e.detail.index;
        let selectType = this.data.selectType;
        this.setData(
            {
                [selectType]: index,
                page: 1,
                storeList: [],
                selectType: null,
                isShowSelectBar: false,
                isNoMoreData: false,
                isNoData: false
            },
            () => {
                let Loc = this.data.Loc;
                if (Loc) this.handleLoadList({ Loc: this.data.selectArr.Loc[Loc].val });
                else this.handleLoadList();
            }
        );
    },
    // 点击select bar逻辑
    handleSelect(e) {
        // 点击动画效果
        this.selectAnimation
            .backgroundColor("rgba(0,0,0,.1)")
            .step({ duration: 100 })
            .backgroundColor("")
            .step({ duration: 100 });
        let selectType = e.currentTarget.dataset.type;

        if (selectType === this.data.selectType) {
            this.setData({
                selectType: null,
                isShowSelectBar: false,
                selectAnimation: this.selectAnimation.export()
            });
        } else {
            this.setData({
                selectType,
                isShowSelectBar: true,
                selectAnimation: this.selectAnimation.export()
            });
        }
    },
    handleTapMsk() {
        this.setData({
            selectType: null,
            isShowSelectBar: false
        });
    },
    // 滑动到底逻辑
    handlePullLoading() {
        if (!this.data.isNoData && !this.data.isNoMoreData) {
            this.handleLoadList();
        }
    },

    // 封装数据加载
    handleLoadList(opts = {}) {
        const that = this;
        wx.request({
            url: "http://m.hmlan.com/Shop/GetShopListP",
            data: {
                page: that.data.page,
                pageSize: that.data.pageSize,
                IsTui: that.data.IsTui,
                OrderStyle: that.data.OrderStyle,
                ...opts
            },
            success(res) {
                const list = that.data.storeList;
                const resList = res.data.ShopListP;
                if (resList) {
                    list.push(...resList);
                    that.setData({
                        storeList: list,
                        page: that.data.page + 1
                    });
                    if (resList.length < that.data.pageSize) {
                        that.setData({
                            isNoMoreData: true
                        });
                    }
                } else if (list.length === 0) {
                    that.setData({
                        isNoData: true
                    });
                } else {
                    that.setData({
                        isNoMoreData: true
                    });
                }
            }
        });
    },
    onReady: function() {
        this.handleLoadList();
        this.selectAnimation = wx.createAnimation();
    }
});
