// pages/index/message/message.js
Page({

  data: {
    tabId: 0,
    show: true,
    focusAuto: false
  },
  selectTab(e) {
    this.setData({
      tabId: ~~e.currentTarget.id
    })
  },
  toInput() {
    this.setData({
      show: !this.data.show,
      focusAuto: !this.data.focusAuto
    })
  },
  //失去焦点时
  blur(e) {
    console.log(e)
    this.setData({
      show: !this.data.show,
      focusAuto: !this.data.focusAuto
    })
  },
  back() {
    wx.navigateBack({})
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  }
})