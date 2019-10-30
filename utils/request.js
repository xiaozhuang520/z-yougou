
const request = (config) => {
  // if (!(config && typeof config === "object" && !Array.isArray(config))) {
  if (!config || typeof config !== "object" || Array.isArray(config)) {
    console.error("参数不是对象");
    return;
  }
  const reg = /^http/;
  if (!reg.test(config.url)) {
    config.url = request.defaults.baseURL + config.url;
  }
  return new Promise((resolve, reject) => {
    wx.request({
      ...config,
      success(res) {
        resolve(res)
      },
      fail(res) {
        reject(res)
      },
      complete(res) {
        if (typeof request.error == "function") {
          request.error(res)
        }
      }
    })
  })
}
request.error = null;
request.defaults = {
  baseURL: ""
}
request.onError = (callback) => {
  request.error = callback
}
export default request;