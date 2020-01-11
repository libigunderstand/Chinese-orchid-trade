// pages/details/component/store-info.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ShopItem: {
      type: Object,
      value:{}
    },
    RateInfo: {
      type: Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    UserRegtime: null
  },
  lifetimes: {
    attached() {
      let time=this.properties.ShopItem.BaseUser.UserRegtime
      this.setData({
        UserRegtime:time.split(" ")[0]
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
