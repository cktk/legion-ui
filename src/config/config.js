export default {
  baseApi: "/api", // 请求路径统一前缀
  vaptchaID: "5dce36188713b71e70a41eb7", // vaptcha验证码ID
  mapboxToken:
    "pk.eyJ1IjoiZXhyaWNrIiwiYSI6ImNramIxOW8wdTF1MmYycXA5bTI0M2lnN3kifQ.eUZCUCh8hS9RZQ7hKySqOg", // mapbox地图accessToken
  // iconfontUrl: '//at.alicdn.com/t/font_$key.css',
  // iconfontVersion:['667895_v7uduh4zui', '1638883_g2ywtlub7ef'],
};


// 配置编译环境和线上环境之间的切换

// 图表库为avue和pig2套地址
const iconfontVersion = ['667895_v7uduh4zui', '1638883_g2ywtlub7ef']
const iconfontUrl = '//at.alicdn.com/t/font_$key.css'

export {

  iconfontUrl,
  iconfontVersion,
}