//1 页面加载的时候 
        //  1从缓存中获取购物车数据 渲染到页面中
        // 这些数据checked=true
// 2 微信支付
    // 1 那些人 那些账号 可以实现微信支付
    // 2 企业账号的小程序后台中 必须 给开发人员 添加上白名单
        // 1 一个appid 可以同时绑定多个开发者
        // 2 这些开发者就可以公用这个appid和
    import {getSetting,chooseAddress,openSetting,showModal,showToast} from "../../utils/asyncWx";
    import regeneratorRuntion from "../../lib/runtime/runtime";
    Page({
        /**
         * 页面的初始数据
         */
        data: {
            address:{},
            cart:[],
            totalPrice:0,
            totalNum:0
        },
        
        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
            
        },
        /**
         * 生命周期函数--监听页面显示
         */
        onShow: function () {
            // 1 获取缓存中的收获地址信息
            const address = wx.getStorageSync('address');
            // console.log(address);
            // address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo;
            // console.log(address);
            // 获取缓存中的购物车数据
            let cart = wx.getStorageSync('cart') || [];
            // 过滤后的购物车数组
            cart= cart.filter(v=>v.checked)
            this.setData({address})
            
            // 1 总价格 总数量
            let totalPrice=0;
            let totalNum=0;
            cart.forEach(v => {
                    totalPrice+=v.num*v.goods_price;
                    totalNum+=v.num;
            });
            // 5 6 把购物车数据重新设置会data中和缓存中
            this.setData({
                cart,
                totalPrice,
                totalNum,
                address 
            })
        }
    })