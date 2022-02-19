// 统一请求路径前缀在libs/axios.js中修改
import { getRequest, getNoAuthRequest, postNoAuthRequest, postRequest, putRequest } from '@/libs/axios';


// 认证
export const siteInfo = (id, params) => {
    return getNoAuthRequest('/legion/oauth2/info/' + id, params)
}
// 认证
export const authorize = (params) => {
    return postNoAuthRequest('/legion/oauth2/authorize', params)
}
// 认证过
export const authorized = (params) => {
    return postRequest('/legion/oauth2/authorized', params)
}
// 获取token
export const token = (params) => {
    return getNoAuthRequest('/legion/oauth2/token', params)
}



// 获取随机secretKey
export const getSecretKey = (params) => {
    return getRequest('/legion/client/getSecretKey', params)
}
// 获取客户端
export const getClientDataList = (params) => {
    return getRequest('/legion/client/getByCondition', params)
}
// 添加客户端
export const addClient = (params) => {
    return postRequest('/legion/client/save', params)
}
// 编辑客户端
export const updateClient = (params) => {
    return putRequest('/legion/client/update', params)
}
// 删除客户端
export const deleteClient = (params) => {
    return postRequest('/legion/client/delByIds', params)
}
