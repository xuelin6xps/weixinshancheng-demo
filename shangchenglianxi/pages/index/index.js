// pages/index/index.js 
// 0 引入 用来发送请求的 方法 一定吧路径补全
import {request} from "../../request/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组
   swiperList:[],
    // 导航 数组
    catesList:[],
    // 楼层数据
    floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList();
    this.getCateList();
    this.getFloorList()
  },
  // 获取轮播图数据
  getSwiperList(){
// 1 发送异步请求获取轮播图数据
      /*没有这个链接 https://api.zbztb.cn/api/public/v1/home/swiperdata*/
      
      // 刚开始想着直接通过赋值的形式
      // var str1 = JSON.stringify({"message":[{"image_src":"https://api-hmugo-web.itheima.net/pyg/banner1.png","open_type":"navigate","goods_id":129,"navigator_url":"/pages/goods_detail/main?goods_id=129"},{"image_src":"https://api-hmugo-web.itheima.net/pyg/banner2.png","open_type":"navigate","goods_id":395,"navigator_url":"/pages/goods_detail/main?goods_id=395"},{"image_src":"https://api-hmugo-web.itheima.net/pyg/banner3.png","open_type":"navigate","goods_id":38,"navigator_url":"/pages/goods_detail/main?goods_id=38"}],"meta":{"msg":"获取成功","status":200}});
      // var swiperList = JSON.parse(str1)
      // console.log(swiperList);

      //通过这个链接可以https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata

    // 不过要在：详情-》本地设置-》中开启不效验合法域名...
    //如果你要上传微信小程序域名必须是https合法的

      // wx.request({
      //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      //   success: (result) => {
      //     console.log(result);
      //     this.setData({
      //       swiperList:result.data.message
      //     })
      //   },
      // })
    // 2 优化的手段可以通过es6的promise来解决这个问题
    request({url:"/home/swiperdata"})
    .then(result=>{
       this.setData({
          swiperList:result
        })
    })
  },
  // 获取 分类导航数据
  getCateList(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/catitems"})
    .then((result)=>{
      // console.log(result);
      this.setData({
        catesList:result
      })
    })
  },
  // 获取楼层数据
  getFloorList(){
    request({url:"/home/floordata"})
    .then((result)=>{
      // console.log(result.data.message);
      this.setData({
        floorList:result
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
    
  },
  onPageScroll:function(){

  },
  onTabItemTap:function(item){

  }
})