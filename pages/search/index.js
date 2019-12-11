// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showConcel:false,
    searchValue:"",
    historyData: wx.getStorageSync('search') || []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  
  handleInput(event){
   const {value}=event.detail;
    let showConcel
    showConcel = value ? true:false;
    this.setData({
      showConcel,
      searchValue:value
    })
  },
  handleConfirm() {
    let arr = wx.getStorageSync('search') || []
    arr.unshift(this.data.searchValue)
    wx.setStorageSync('search', arr)
    wx.navigateTo({
      url: '/pages/goods_list/index?query='+ this.data.searchValue
    })
  },
  handleCancel(){
    this.setData({
      showConcel:false,
      searchValue: ""
    })
  },
  handleEmpty(){
    wx.removeStorageSync('search')
    this.setData({
      historyData:[]
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
    this.setData({
      historyData: wx.getStorageSync('search') || []
    })
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