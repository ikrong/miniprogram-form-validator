import regeneratorRuntime from './../../utils/runtime';

Page({
    data: {
        formData: {
            qq: "",
            phone: "",
            name: "",
        },
        formValidators: {
            qq: [
                {
                    required: true,
                },
                {
                    message: "必须为数字",
                    regexp: "\^[0-9]{0,}\$"
                }
            ],
            phone: [
                {
                    required: true,
                    message: "手机号码必填",
                },
                {
                    message: "手机号码不正确",
                    regexp: "\^1(3|4|5|7|8|9)\\d{9}\$"
                }
            ],
            name: [
                {
                    message: "姓名必须为2-3个汉字",
                    validator(value) {
                        return new Promise(r => {
                            setTimeout(() => {
                                if (/^[\u4e00-\u9fa5]{2,3}$/.test(value)) {
                                    r(true)
                                } else {
                                    r(false)
                                }
                            }, 1000);
                        })
                    }
                }
            ],
        }
    },
    inputHandle(e) {
        this.setData({
            formData: Object.assign(this.data.formData, {
                [e.target.id]: e.detail.value,
            })
        })
    },
    async validator() {
        wx.showLoading({
            title: '正在验证表单',
            mask: true,
        })
        try {
            await this.selectComponent("#form").validate();
            console.log("...")
        } catch (error) {
            console.error(error)
        }
        wx.hideLoading();
    }
})
