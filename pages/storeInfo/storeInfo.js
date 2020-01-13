Page({
    data: {
        storeData: null
    },
    onLoad(options) {
        const that = this;
        const UserId = options.UserId;
        wx.request({
            url: "http://m.hmlan.com/Shop/GetShopItem?UserId=" + UserId,
            success(res) {
                console.log(res);
                
                that.setData({
                    storeData: res.data
                });
            }
        });
    }
});
