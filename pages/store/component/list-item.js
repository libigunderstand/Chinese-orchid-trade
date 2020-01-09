// pages/store/component/list-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    time:null
  },
  lifetimes: {
    attached() {
      const time = this.handleFormateTime(this.properties.item.ShopGrateTime)
      this.setData({
        time
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleFormateTime(time) {
      const timestamp = time.match(/\d+/)[0]
      const date = new Date(+timestamp)
      
      return date.toLocaleString()
    }
  }
})
