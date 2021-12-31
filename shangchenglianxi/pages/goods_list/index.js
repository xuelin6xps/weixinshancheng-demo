import { request } from "../../request/index";
// 1 用户上划页面 滚动条触底 开始加载下一页的数据
    // 1 找到滚动条触底事件  微信小程序官网文档去寻找
    // 2 判断还有没有下一页数据
        // 1 获取到总页数  只有总条数
            // 总页数 = Math.ceil(总条数/页容量 pagesize)
            // 总页数 = Math.ceil(23/10)
        // 2 获取到当前的页码   pagenum
        // 3 判断一下 当前页面是否大于等于 总页数
        // 表示 没有下一页数据
    // 3 假入没有下一页数据 弹出一个提示
    // 4 假入还有下一页数据 来加载下一页数据
        // 1 当前的页码 ++
        // 2 重新发送请求
        // 数据请求回来 要对data中的数组 进行拼接 而不是全部替换
// 2 下拉刷新页面
    // 1 触发下拉刷新事件  需要在页面的json文件中开启一个配置项
        // 找到 触发下拉刷新的事件
    // 2 重置 数据 数组
    // 3 重置页码 设置为1
    // 4 重新发送请求
    // 5 数据请求回来了 需要手动关闭等待效果
// pages/goods_list/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs:[
            {
                id:0,
                value:"综合",
                isActive:true
            },
            {
                id:1,
                value:"销量",
                isActive:false
            },
            {
                id:2,
                value:"价格",
                isActive:false
            }
        ],
        goodsList:[]
    },
    // 接口要的参数
    QueryParams:{
        query:"",
        cid:"",
        pagenum:1,
        pageseize:10
    },
    // 总页数
    totalPages:1,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options);
        this.QueryParams.cid = options.cid;
        this.getGoodsList()
    },
    // 获取商品列表数据
    async getGoodsList(){
        const res = await request({url:"/goods/search",data:this.QueryParams})
        // 获取 总条数
        const total = res.total;
        // 计算总页数
        this.totalPages = Math.ceil(total/this.QueryParams.pageseize); 
        // console.log(this.totalPages);
        this.setData({
            // 拼接了数组
            goodsList:[...this.data.goodsList,...res.goods]
        })
        // 关闭下拉刷新的窗口 如果没有调用下拉刷新的窗口 直接关闭也不会报错
        wx-wx.stopPullDownRefresh()
    },
    // 标题点击事件 从子组件传递过来的
    handleTabsItemChange(e){
        // console.log(e);
        // 1 获取被点击的标题索引
        const {index} = e.detail;
        // 2 修改原数组
        let {tabs} = this.data;
        tabs.forEach((v,i)=>{
            i===index ? v.isActive = true:v.isActive = false;
            // 3 赋值到data中
            this.setData({
                tabs
            })
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
        console.log("%c" + "刷新","color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
        // 1 重置数组
        this.setData({
            goodsList:[]
        })
        // 2 重置页码
        this.QueryParams.pagenum =1;
        // 3 发送请求
        this.getGoodsList()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        // console.log("页面触底");
        // 判断有没有下一页页数据
        if(this.QueryParams.pagenum>=this.totalPages){
        // 没有下一页数据
        // console.log("%c" + "没有下一页数据","color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
        wx-wx.showToast({title: '没有下一页数据了'})
        }else{
            // console.log("%c" + "有下一页数据","color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
            this.QueryParams.pagenum++;
            this.getGoodsList()
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})