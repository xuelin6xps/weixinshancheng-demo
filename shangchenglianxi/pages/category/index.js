// pages/category/index.js
import {request} from "../../request/index";
import regeneratorRuntion from "../../lib/runtime/runtime";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 左侧的菜单数据
        leftMenuList:[],
        // 右侧的商品数据
        rightContent:[],
        // 被点击的左侧的active
        currentIndex:0,
        // 右侧内容的滚动条距离顶部的距离
        scrollTop:0
    },
    // 接口的返回数据
    Cates:[],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 0 web中的本地存储和 小程序的本地存储的区别
        // 1 写代码的方式不一样
            // web: 存储localStorage.setItem("key","value")，获取localStorage.getItem("key")   
            // 小程序中：存储wx-wx.setStorageSync('key', "value");获取wx-wx.getStorageSync('key');
        // 2 存储的时候 有没有做类型转换
            // web:不管存入的是什么类型的数据，最终都会先调用一下toString(),把数据变成了字符串 再存入进去
            // 小程序：不存在类型转换的这个操作 存入的是什么类型的进去 获取的时候就是什么类型
        // 1 先判断下本地存储中有没有旧的数据
        //  {time:Date.now(),data:[...]}
        // 2 没有旧数据 直接发送新请求
        // 3 有旧的数据同时 旧的数据没有过期 就使用 本地存储中的旧的数据即可
        // 1 获取本地存储中的数据 （小程序中也是本地存储 技术）
        const Cates = wx-wx.getStorageSync('cates');
        // 2 判断
        if(!Cates){
            // 不存在发送请求获取数据
            this.getCates()
        }else{
            // 有旧数据 定义过期时间 10秒钟 改成 5分钟
            if(Date.now()-Cates.time>1000*10){
                // 重新发送请求
                this.getCates()
            }else{
                // 可以使用旧的数据
                console.log("可以使用旧的数据");
                this.Cates = Cates.data;
                // 构造左侧的大菜单数据
                let leftMenuList = this.Cates.map(v=>v.cat_name)
                // 构造右侧的商品数据
                let rightContent = this.Cates[0].children
                this.setData({
                    leftMenuList,
                    rightContent
                })
            }
        }
        
    },
    async getCates(){
        // request({url:"/categories"})
        // .then((result)=>{
        //     this.Cates = result.data.message;
        //     // console.log(this.Cates);
        //     // 把接口的数据存入到本地存储中
        //     wx-wx.setStorageSync('cates', {item:Date.now(),data:this.Cates});
        //     // 构造左侧的大菜单数据
        //     // 这个方法我获取的为空，所以我选择浪费性能使用下面的方法
        //     let leftMenuList = this.Cates.map(v=>v.cat_name)
        //     // let leftMenuList = []
        //     // this.Cates.forEach(v=>{
        //     //     leftMenuList.push(v.cat_name)
        //     // })
        //     // 构造右侧的商品数据
        //     let rightContent = this.Cates[0].children
        //     this.setData({
        //         leftMenuList,
        //         rightContent
        //     })
        //     // console.log(this.Cates);
        // })
        const result = await request({url:"/categories"})
            this.Cates = result;
             // 把接口的数据存入到本地存储中
            wx-wx.setStorageSync('cates', {item:Date.now(),data:this.Cates});
             let leftMenuList = this.Cates.map(v=>v.cat_name)
             // 构造右侧的商品数据
            let rightContent = this.Cates[0].children
            this.setData({
                leftMenuList,
                rightContent
            })
            // console.log(this.Cates);
    },
    // 左侧菜单栏点击事件
    handleItemTap(e){
        // console.log(e);
        // 1 获取被点击的标题身上的索引
        // 2 给data中的currentIndex赋值就可以了
        const {index} = e.currentTarget.dataset;
        let rightContent = this.Cates[index].children
        this.setData({
            currentIndex:index,
            rightContent,
            // 重新设置 右侧内容的scroll-view标签的距离顶部的距离
            scrollTop:0
        })

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