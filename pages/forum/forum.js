// pages/forum/forum.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    tab: [{
      text: "最新回复",
      ViewType: "",
      OrderStyle: 0
    }, {
      text: "最新发表",
      ViewType: "",
      OrderStyle: 1
    }, {
      text: "精华区",
      ViewType: "jh",
      OrderStyle: 0
    }, {
      text: "原创区",
      ViewType: "yc",
      OrderStyle: 0
    }],
    datas:[
      {
        page:1,
        list:[]
      },
      {
        page:1,
        list:[]
      },
      {
        page:1,
        list:[]
      },
      {
        page:1,
        list:[]
      }
    ]
  },


  switchTab(e) {
    // 判断该页有没有数据
    if (!this.data.datas[e.target.dataset.index].list.length){
      this.getDatas(e.target.dataset.index)
    }
    
    this.setData({
      currentTab:e.target.dataset.index
    })
  },

  swiperChange(e){
    // 判断该页有没有数据
    if (!this.data.datas[e.detail.current].list.length){
      this.getDatas(e.detail.current)
    }
    
    this.setData({
      currentTab: e.detail.current
    })
  },

  getDatas(index){
    var that = this
    let {tab,datas}=this.data
    let ViewType = index?tab[index].ViewType:""
    let OrderStyle = index?tab[index].OrderStyle:""
    let page = datas[index].page
    wx.request({
      url: 'http://m.hmlan.com/Forum/Topic/GetListTopicP?Title=&Author=&ViewType=&OrderStyle=0&page=1&pageSize=20',
      data:{
        page: page,
        ViewType: ViewType,
        OrderStyle: OrderStyle
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        // 打印数据结构
        // console.log(res.data)
        // 将获取到的数据，放在对应的数据里
        datas[index].list = datas[index].list.concat(res.data.ListTopicP)
        that.setData({
          page: page + 1,
          datas: datas
        });
        // console.log(datas);
      }
    })
  },

  loading(){
    wx.showLoading({
      title: '加载中',
    })
    this.getDatas(this.data.currentTab)
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDatas(0)
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