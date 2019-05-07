## 小程序表单验证框架
一款小程序表单验证框架，目前还不完善，提供一个思路，仅供参考

#### 安装
```js
npm install miniprogram-form-validator
// or
yarn add miniprogram-form-validator
```

#### 引入
在app.json中引入可全局使用
引入之后需要点击小程序开发工具的 【工具>构建npm】, 否则会报错的

```json
{
  "usingComponents": {
    "form-validator": "miniprogram-form-validator/form-validator",
    "form-tip": "miniprogram-form-validator/form-tip"
  }
}
```

```html
<form-validator 
  id="form"
  formGroup="{{formGroup}}"  // 表单验证器
  formData="{{formData}}"  // 表单双向绑定数据
>
    // name 是需要验证的键名
    <form-tip name="id"></form-tip>
</form-validator>
```

```js
// 验证器的字段含义
//   {
//     required: true, // 是否必填
//     message: "", // 出错后的提示信息
//     type: "", // 内置验证方法
//     regexp: RegExp, // 正则表达式
//     validator: Function // 自定义验证方法，返回 boolean 或者 Promise<boolean>
//   }
Page({
    data:{
        formGroup:{
            id:[
                { required:true },
                {
                    validator:(value,name)=>Promise<Boolean>
                },
            ]
        },
        formData:{
            id:"",
        }
    },
    async validate(){
        let result = await this.selectComponents("#form").validate();
        // 验证通过了
    }
})
```