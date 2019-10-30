//index.js
import request from "../../utils/request.js"
Page({
  data: {
    swiperImg:[],
    navData:[],
    floors:[]
  },
  onLoad(){
    request({
      url:'/api/public/v1/home/swiperdata'
    }).then(res=>{
      const {message}=res.data;
     this.setData({
       swiperImg:message
     })
    });
    request({
      url:'/api/public/v1/home/catitems'
    }).then(res=>{
      const { message } = res.data;
      this.setData({
        navData: message
      })
    })
    request({
      url:"/api/public/v1/home/floordata"
    }).then(res=>{
      const {message}=res.data;
      this.setData({
        floors:message
      })
    })
  }
})
