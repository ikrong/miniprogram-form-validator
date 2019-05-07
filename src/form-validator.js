import regeneratorRuntime from './runtime';

Component({
  properties: {
    /**表单验证组 */
    formGroup: {
      type: Object,
      value: {},
    },
    /**表单数据 */
    formData: {
      type: Object,
      value: {},
    },
  },
  data: {
    formValidate: {},
  },
  relations: {
    './form-tip': {
      type: 'child', // 关联的目标节点应为子节点
      linked: function (target) {
        // 每次有custom-li被插入时执行，target是该节点实例对象，触发在该节点attached生命周期之后 
        this.resetValidateList();
      },
      linkChanged: function (target) {
        // 每次有custom-li被移动后执行，target是该节点实例对象，触发在该节点moved生命周期之后
        this.resetValidateList();
      },
      unlinked: function (target) {
        // 每次有custom-li被移除时执行，target是该节点实例对象，触发在该节点detached生命周期之后
        this.resetValidateList();
      }
    }
  },
  methods: {
    async validate() {
      this.clearErrorTip();
      let err = false;
      for (let key in this.data.formGroup) {
        let validators = this.data.formGroup[key]
        let result
        try {
          result = await this.check(validators, this.data.formData[key], key);
          if (!result) {
            err = true;
          }
        } catch (error) { }
      }
      if (!err) {
        return true;
      }
      throw new Error("表单填写有误");
    },
    async check(validators, data, key) {
      let isError = false,
        tip = "";
      for (let i = 0; i < validators.length; i++) {
        let validator = validators[i];
        // const Validator = [
        //   // 表单验证器
        // {
        //   required: true, // 是否必填
        //   message: "", // 出错后的提示信息
        //   type: "", // 内置验证方法
        //   regexp: RegExp, // 正则表达式
        //   validator: Function // 自定义验证方法
        // }
        // ]
        // 必填项
        if (validator.required) {
          if (typeof data == "undefined" || data === "" || data == null) {
            isError = true;
            tip = validator.message || "必填项"
          }
        }
        if (data) {
          if (validator.type) {
            // 内置验证器
            throw "暂未实现"
          }
          if (validator.regexp) {
            let regexp = new RegExp(validator.regexp);
            if (!regexp.test(data)) {
              isError = true;
              tip = validator.message;
            }
          }
          if (validator.validator) {
            let result
            try {
              result = await validator.validator(data, key, this.data.formData);
              if (typeof result == "boolean" && !result) {
                isError = true;
                tip = validator.message;
              }
            } catch (error) {
              isError = true;
              tip = "验证器未正常返回结果"
            }
          }
        }
        if (isError) break;
      }
      if (isError && this.data.formValidate[key]) {
        this.data.formValidate[key].setTip(tip);
      }
      return isError ? false : true;
    },
    clearErrorTip() {
      for (let key in this.data.formValidate) {
        let validate = this.data.formValidate[key]
        validate.setTip("")
      }
    },
    resetValidateList() {
      let validate = {}
      this.getRelationNodes('./form-tip').map(item => {
        if (item.properties.name) {
          validate[item.properties.name] = item;
        }
      })
      this.setData({
        formValidate: validate,
      })
    }
  },
  ready: function () { },
})