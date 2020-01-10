Component({
  properties: {
    selectList: {
      type: Array,
      value: []
    },
  },
    data: {
        
  },
  methods: {
    handleSelect(e) {
      this.triggerEvent("HandleSelect",{index:e.currentTarget.dataset.index})
    }
    }
});
