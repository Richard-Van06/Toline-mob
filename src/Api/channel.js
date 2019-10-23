// 封装所有与频道相关的网络请求
function apiGetChannelList (axios, { url, method }) {
  return axios({
    url: url,
    method: method
  })
}
// 按需导出
export { apiGetChannelList }
