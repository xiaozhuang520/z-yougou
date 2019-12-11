// pages/goods_detail/index.js
import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options;
    request({
      url: "/api/public/v1/goods/detail",
      data: {
        goods_id
      }
    }).then(res => {
      const { message } = res.data;
      this.setData({
        goodsDetail: message
      })
    })
  },
  handleGoods() {
    const { goods_id, goods_name, goods_price, goods_small_logo} = this.data.goodsDetail;
    wx.showModal({
      title: '提示',
      content: '是否加入购物车',
      success: (res) => {
        if (res.confirm) {
          let goods = wx.getStorageSync('goods') || {};
          let number = goods[goods_id] ? goods[goods_id].number + 1 : 1;

          goods[goods_id] = {
            goods_id,
            goods_name,
            goods_price: goods_price.toFixed(2),
            goods_small_logo,
            number,
            selected: true
          };
          wx.setStorageSync("goods", goods)
        } else if (res.cancel) {
          return;
        }
      }
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