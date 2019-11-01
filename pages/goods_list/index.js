// pages/goods_list/index.js
import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query: '',
    pagenum: 1,
    pagesize: 10,
    goods: [],
    hasMore:true,
    loading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { query } = options;
    this.setData({
      query
    })
    this.getGoodList();
    
  },
  getGoodList() {
    if(this.data.loading){
      return;
    }
    request({
      url: '/api/public/v1/goods/search',
      data: {
        query:this.data.query,
        pagenum: this.data.pagenum,
        pagesize: this.data.pagesize
      }
    }).then(res => {
      const { goods } = res.data.message;
      if(goods.length<10){
        this.setData({
          hasMore:false
        })
      }
      const newGoods = goods.map(v => {
        v.goods_price = Number(v.goods_price).toFixed(2)
        return v
      })
      this.setData({
        goods: [...this.data.goods,...newGoods],
        pagenum:this.data.pagenum+1,
        loading:true
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
    if(this.data.loading){
      if (this.data.hasMore) {
        this.setData({
          loading: false
        })
        this.getGoodList()
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})