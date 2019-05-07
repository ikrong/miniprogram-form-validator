Component({
  relations: {
    './form-validator': {
      type: 'parent', // 关联的目标节点应为父节点
      linked: function (target) {
        // 每次被插入到custom-ul时执行，target是custom-ul节点实例对象，触发在attached生命周期之后
      },
      linkChanged: function (target) {
        // 每次被移动后执行，target是custom-ul节点实例对象，触发在moved生命周期之后
      },
      unlinked: function (target) {
        // 每次被移除时执行，target是custom-ul节点实例对象，触发在detached生命周期之后
      }
    }
  },
  properties: {
    name: {
      type: String,
      value: "",
    }
  },
  data: {
    tip: ""
  },
  methods: {
    setTip(tip) {
      this.setData({
        tip: tip,
      })
    }
  },
})