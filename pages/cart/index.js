// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userAddress: {},
    total: 0,
    goodList:{},
    checked:true,
    sum:0,
    isShow:true
  },
  handleGetAddress() {
    wx.chooseAddress({
      success: (res) => {
        res.address = res.provinceName + res.cityName + res.countyName + res.detailInfo;
        this.setData({
          userAddress: res
        })
      }
    })
  },
 
  handleState(event){
    let { selected,goods_id} = event.target.dataset.item
    let newGoods = wx.getStorageSync('goods') || {}
    newGoods[goods_id].selected = !selected
    Object.keys(newGoods).forEach((item)=>{
      if(!newGoods[item].selected){
        this.setData({
          checked:false
        })
      }else{
        this.setData({
          checked: true
        })
      }
    })
    this.setData({
      goodList: newGoods,
    })
  
    wx.setStorageSync("goods", newGoods)
    this.handleSum()
  },
  checkedState() {
    let newGoods = wx.getStorageSync('goods') || {}
    Object.keys(newGoods).forEach((item) => {
      newGoods[item].selected = !this.data.checked
    })
    this.setData({
      checked: !this.data.checked,
      goodList: newGoods,
    })
    wx.setStorageSync("goods", newGoods)
    this.handleSum()
  },
  handleMinus(event){
    
    if (event.target.dataset.item.number <=1){
      wx.showModal({
        title: '提示',
        content: '是否移除该商品',
        success:(res)=> {
          if (res.confirm) {
            let { number, goods_id } = event.target.dataset.item
            let newGoods = wx.getStorageSync('goods') || {}
            delete newGoods[goods_id]
            this.setData({
              goodList: newGoods,
              isShow: false
            })
            wx.setStorageSync("goods", newGoods)
          } else if (res.cancel) {
            return;
          }
        }
      })
    }else{
      let { number, goods_id } = event.target.dataset.item
      let newGoods = wx.getStorageSync('goods') || {}
      newGoods[goods_id].number = number - 1
      this.setData({
        goodList: newGoods,
      })
      wx.setStorageSync("goods", newGoods)
      this.handleSum()
    }
  },
  handleAdd(event){
    let {number,goods_id}=event.target.dataset.item
    let newGoods = wx.getStorageSync('goods') || {}
    newGoods[goods_id].number=+number+1
    this.setData({
      goodList: newGoods,
   
    })
    wx.setStorageSync("goods", newGoods)
    this.handleSum()
  },
  handleSum(){
    let newGoods = wx.getStorageSync('goods') || {}
    var total=0
    var sum=0
    Object.keys(newGoods).forEach((item)=>{
      if (newGoods[item].selected) {
          total+=(+newGoods[item].goods_price * newGoods[item].number)
          sum+=1
      }
    })
    this.setData({
      total:total.toFixed(2),
      sum
    })
  },
  
  inputNumber(event) {
    let value = event.detail.value
    let newGoods = wx.getStorageSync('goods') || {}
    let { id } = event.target.dataset
    if (value <= 0) {
      newGoods[id].number = 1
    } else {
      newGoods[id].number = value
    }
    this.setData({
      goodList: newGoods,
    })
    wx.setStorageSync("goods", newGoods)
    this.handleSum()
  },
  handleInput(event){
   this.inputNumber(event)
  },
  handleBlur(event){
    this.inputNumber(event)
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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
    let newGoods = wx.getStorageSync('goods') || {}
    if (Object.keys(newGoods).length == 0){
      this.setData({
        isShow:false
      })
    }else{
      this.setData({
        isShow: true
      })
    }
    this.setData({
      goodList: newGoods,
    })
    this.handleSum()
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