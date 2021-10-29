// 统一请求路径前缀在libs/axios.js中修改
import { getRequest, postRequest, putRequest, postBodyRequest, getNoAuthRequest, postNoAuthRequest } from '@/libs/axios';


// Vaptcha ID
export const vaptchaID = config.vaptchaID
// Vaptcha离线验证接口
export const vaptchaOffline = `${config.baseApi}/legion/common/vaptcha/offline`
// 文件上传接口
export const uploadFile = `${config.baseApi}/legion/upload/file`
// 验证码渲染图片接口
export const drawCodeImage = `${config.baseApi}/legion/common/captcha/draw/`
// 获取菜单
export const getMenuList = `${config.baseApi}/legion/permission/getMenuList`
// 获取数据字典
export const getDictData = `${config.baseApi}/legion/dictData/getByType/`
// Websocket
export const ws = `${config.baseApi}/ws`


//获取系统信息
export const systemInfo = (params) => {
    return getRequest('/legion/system/info', params)
}

// 登陆
export const login = (params) => {
    return postNoAuthRequest('/legion/login', params)
}
// 获取用户登录信息
export const userInfo = (params) => {
    return getRequest('/legion/user/info', params)
}
// 注册
export const regist = (params) => {
    return postNoAuthRequest('/legion/user/regist', params)
}
// 初始化验证码
export const initCaptcha = (params) => {
    return getNoAuthRequest('/legion/common/captcha/init', params)
}
// 发送登录短信验证码
export const sendLoginSms = (mobile, params) => {
    return getNoAuthRequest(`/legion/common/captcha/sendLoginSms/${mobile}`, params)
}
// 发送注册短信验证码
export const sendRegistSms = (mobile, params) => {
    return getNoAuthRequest(`/legion/common/captcha/sendRegistSms/${mobile}`, params)
}
// 发送重置密码短信验证码
export const sendResetSms = (mobile, params) => {
    return getNoAuthRequest(`/legion/common/captcha/sendResetSms/${mobile}`, params)
}
// 发送修改绑定手机短信验证码
export const sendEditMobileSms = (mobile, params) => {
    return getRequest(`/legion/common/captcha/sendEditMobileSms/${mobile}`, params)
}
// 通过手机重置密码
export const resetByMobile = (params) => {
    return postNoAuthRequest('/legion/user/resetByMobile', params)
}
// 发送重置密码邮件验证码
export const sendResetEmail = (email, params) => {
    return getNoAuthRequest(`/legion/email/sendResetCode/${email}`, params)
}
// 发送修改绑定邮件验证码
export const sendEditEmail = (email, params) => {
    return getRequest(`/legion/email/sendEditCode/${email}`, params)
}
// 通过邮件重置密码
export const resetByEmail = (params) => {
    return postNoAuthRequest('/legion/email/resetByEmail', params)
}
// 短信验证码登录
export const smsLogin = (params) => {
    return postRequest('/legion/user/smsLogin', params)
}
// IP天气信息
export const ipInfo = (params) => {
    return getRequest('/legion/common/ip/info', params)
}
// 个人中心编辑
export const userInfoEdit = (params) => {
    return postRequest('/legion/user/edit', params)
}
// 个人中心发送修改邮箱验证邮件
export const sendCodeEmail = (email, params) => {
    return getRequest(`/legion/email/sendCode/${email}`, params)
}
// 个人中心发送修改邮箱验证邮件
export const editEmail = (params) => {
    return postRequest('/legion/email/editEmail', params)
}
// 个人中心修改密码
export const changePass = (params) => {
    return postRequest('/legion/user/modifyPass', params)
}
// 个人中心修改手机
export const changeMobile = (params) => {
    return postRequest('/legion/user/changeMobile', params)
}
// 解锁
export const unlock = (params) => {
    return postRequest('/legion/user/unlock', params)
}
// 获取公告
export const getNotice = (params) => {
    return getNoAuthRequest('/legion/setting/notice', params)
}



// github登录
export const githubLogin = (params) => {
    return getNoAuthRequest('/legion/social/github/login', params)
}
// qq登录
export const qqLogin = (params) => {
    return getNoAuthRequest('/legion/social/qq/login', params)
}
// 微博登录
export const weiboLogin = (params) => {
    return getNoAuthRequest('/legion/social/weibo/login', params)
}
// 微信登录
export const wechatLogin = (params) => {
    return getNoAuthRequest('/legion/social/wechat/login', params)
}
// 钉钉登录
export const dingdingLogin = (params) => {
    return getNoAuthRequest('/legion/social/dingding/login', params)
}
// 企业微信登录
export const workwechatLogin = (params) => {
    return getNoAuthRequest('/legion/social/workwechat/login', params)
}
// 绑定账号
export const relate = (params) => {
    return postRequest('/legion/social/relate', params)
}
// 获取JWT
export const getJWT = (params) => {
    return getNoAuthRequest('/legion/social/getJWT', params)
}



// 获取绑定账号信息
export const relatedInfo = (username, params) => {
    return getRequest(`/legion/relate/getRelatedInfo/${username}`, params)
}
// 解绑账号
export const unRelate = (params) => {
    return postRequest('/legion/relate/delByIds', params)
}
// 分页获取绑定账号信息
export const getRelatedListData = (params) => {
    return getRequest('/legion/relate/findByCondition', params)
}



// 获取用户数据 多条件
export const getUserListData = (params) => {
    return getRequest('/legion/user/getByCondition', params)
}
// 通过用户名搜索
export const searchUserByName = (username, params) => {
    return getRequest('/legion/user/searchByName/'+username, params)
}
// 获取全部用户数据
export const getAllUserData = (params) => {
    return getRequest('/legion/user/getAll', params)
}
// 通过部门获取全部用户数据
export const getUserByDepartmentId = (id, params) => {
    return getRequest(`/legion/user/getByDepartmentId/${id}`, params)
}
// 添加用户
export const addUser = (params) => {
    return postRequest('/legion/user/admin/add', params)
}
// 编辑用户
export const editUser = (params) => {
    return postRequest('/legion/user/admin/edit', params)
}
// 启用用户
export const enableUser = (id, params) => {
    return postRequest(`/legion/user/admin/enable/${id}`, params)
}
// 禁用用户
export const disableUser = (id, params) => {
    return postRequest(`/legion/user/admin/disable/${id}`, params)
}
// 删除用户
export const deleteUser = (params) => {
    return postRequest('/legion/user/delByIds', params)
}
// 导入用户
export const importUserData = (params) => {
    return postBodyRequest('/legion/user/importData', params)
}
// 重置用户密码
export const resetUserPass = (params) => {
    return postRequest('/legion/user/resetPass', params)
}



// 获取一级部门
export const initDepartment = (params) => {
    return getRequest('/legion/department/getByParentId/0', params)
}
// 加载部门子级数据
export const loadDepartment = (id, params) => {
    return getRequest(`/legion/department/getByParentId/${id}`, params)
}
// 添加部门
export const addDepartment = (params) => {
    return postRequest('/legion/department/add', params)
}
// 编辑部门
export const editDepartment = (params) => {
    return postRequest('/legion/department/edit', params)
}
// 删除部门
export const deleteDepartment = (params) => {
    return postRequest('/legion/department/delByIds', params)
}
// 搜索部门
export const searchDepartment = (params) => {
    return getRequest('/legion/department/search', params)
}



// 获取全部角色数据
export const getAllRoleList = (params) => {
    return getRequest('/legion/role/getAllList', params)
}
// 分页获取角色数据
export const getRoleList = (params) => {
    return getRequest('/legion/role/getAllByPage', params)
}
// 添加角色
export const addRole = (params) => {
    return postRequest('/legion/role/save', params)
}
// 编辑角色
export const editRole = (params) => {
    return postRequest('/legion/role/edit', params)
}
// 设为或取消注册角色
export const setDefaultRole = (params) => {
    return postRequest('/legion/role/setDefault', params)
}
// 分配角色权限
export const editRolePerm = (params) => {
    return postRequest('/legion/role/editRolePerm', params)
}
// 分配角色数据权限
export const editRoleDep = (params) => {
    return postRequest('/legion/role/editRoleDep', params)
}
// 删除角色
export const deleteRole = (params) => {
    return postRequest('/legion/role/delByIds', params)
}



// 获取全部权限数据
export const getAllPermissionList = (params) => {
    return getRequest('/legion/permission/getAllList', params)
}
// 加载数据
export const loadPermission = (id, params) => {
    return getRequest(`/legion/permission/getByParentId/${id}`, params)
}
// 添加权限
export const addPermission = (params) => {
    return postRequest('/legion/permission/add', params)
}
// 编辑权限
export const editPermission = (params) => {
    return postRequest('/legion/permission/edit', params)
}
// 删除权限
export const deletePermission = (params) => {
    return postRequest('/legion/permission/delByIds', params)
}
// 搜索权限
export const searchPermission = (params) => {
    return getRequest('/legion/permission/search', params)
}



// 获取全部字典
export const getAllDictList = (params) => {
    return getRequest('/legion/dict/getAll', params)
}
// 添加字典
export const addDict = (params) => {
    return postRequest('/legion/dict/add', params)
}
// 编辑字典
export const editDict = (params) => {
    return postRequest('/legion/dict/edit', params)
}
// 删除字典
export const deleteDict = (params) => {
    return postRequest('/legion/dict/delByIds', params)
}
// 搜索字典
export const searchDict = (params) => {
    return getRequest('/legion/dict/search', params)
}
// 获取全部字典数据
export const getAllDictDataList = (params) => {
    return getRequest('/legion/dictData/getByCondition', params)
}
// 添加字典数据
export const addDictData = (params) => {
    return postRequest('/legion/dictData/add', params)
}
// 编辑字典数据
export const editDictData = (params) => {
    return postRequest('/legion/dictData/edit', params)
}
// 删除字典数据
export const deleteData = (params) => {
    return postRequest('/legion/dictData/delByIds', params)
}
// 通过类型获取字典数据
export const getDictDataByType = (type, params) => {
    return getRequest(`/legion/dictData/getByType/${type}`, params)
}



// 分页获取日志数据
export const getLogListData = (params) => {
    return getRequest('/legion/log/getAllByPage', params)
}
// 删除日志
export const deleteLog = (params) => {
    return postRequest('/legion/log/delByIds', params)
}
// 清空日志
export const deleteAllLog = (params) => {
    return postRequest('/legion/log/delAll', params)
}


// 分页获取Redis数据
export const getRedisData = (params) => {
    return getRequest('/legion/redis/getAllByPage', params)
}
// 通过key获取Redis信息
export const getRedisByKey = (key, params) => {
    return getRequest(`/legion/redis/getByKey/${key}`, params)
}
// 获取Redis键值数量
export const getRedisKeySize = (params) => {
    return getRequest('/legion/redis/getKeySize', params)
}
// 获取Redis内存
export const getRedisMemory = (params) => {
    return getRequest('/legion/redis/getMemory', params)
}
// 获取Redis信息
export const getRedisInfo = (params) => {
    return getRequest('/legion/redis/info', params)
}
// 添加编辑Redis
export const saveRedis = (params) => {
    return postRequest('/legion/redis/save', params)
}
// 删除Redis
export const deleteRedis = (params) => {
    return postRequest('/legion/redis/delByKeys', params)
}
// 清空Redis
export const deleteAllRedis = (params) => {
    return postRequest('/legion/redis/delAll', params)
}



// 分页获取定时任务数据
export const getQuartzListData = (params) => {
    return getRequest('/legion/quartzJob/getAllByPage', params)
}
// 添加定时任务
export const addQuartz = (params) => {
    return postRequest('/legion/quartzJob/add', params)
}
// 编辑定时任务
export const editQuartz = (params) => {
    return postRequest('/legion/quartzJob/edit', params)
}
// 暂停定时任务
export const pauseQuartz = (params) => {
    return postRequest('/legion/quartzJob/pause', params)
}
// 恢复定时任务
export const resumeQuartz = (params) => {
    return postRequest('/legion/quartzJob/resume', params)
}
// 删除定时任务
export const deleteQuartz = (params) => {
    return postRequest('/legion/quartzJob/delByIds', params)
}



// 分页获取消息数据
export const getMessageData = (params) => {
    return getRequest('/legion/message/getByCondition', params)
}
// 获取单个消息详情
export const getMessageDataById = (id, params) => {
    return getRequest(`/legion/message/get/${id}`, params)
}
// 添加消息
export const addMessage = (params) => {
    return postRequest('/legion/message/add', params)
}
// 编辑消息
export const editMessage = (params) => {
    return postRequest('/legion/message/edit', params)
}
// 删除消息
export const deleteMessage = (params) => {
    return postRequest('/legion/message/delByIds', params)
}
// 分页获取消息推送数据
export const getMessageSendData = (params) => {
    return getRequest('/legion/messageSend/getByCondition', params)
}
// 编辑发送消息
export const editMessageSend = (params) => {
    return postRequest('/legion/messageSend/edit', params)
}
// 删除发送消息
export const deleteMessageSend = (params) => {
    return postRequest('/legion/messageSend/delByIds', params)
}
// 批量处理消息
export const allMessageSend = (type, params) => {
    return getRequest(`/legion/messageSend/all/${type}`, params)
}



// 分页获取文件数据
export const getFileListData = (params) => {
    return getRequest('/legion/file/getByCondition', params)
}
// 复制文件
export const copyFile = (params) => {
    return postRequest('/legion/file/copy', params)
}
// 重命名文件
export const renameFile = (params) => {
    return postRequest('/legion/file/rename', params)
}
// 删除文件
export const deleteFile = (params) => {
    return postRequest('/legion/file/delete', params)
}

// 检查oss配置
export const checkOssSet = (params) => {
    return getRequest('/legion/setting/oss/check', params)
}
// 检查oss配置
export const checkSmsSet = (params) => {
    return getRequest('/legion/setting/sms/check', params)
}
// 获取oss配置
export const getOssSet = (serviceName, params) => {
    return getRequest(`/legion/setting/oss/${serviceName}`, params)
}
// 编辑oss配置
export const editOssSet = (params) => {
    return postRequest('/legion/setting/oss/set', params)
}
// 获取sms配置
export const getSmsSet = (serviceName, params) => {
    return getRequest(`/legion/setting/sms/${serviceName}`, params)
}
// 获取sms模板code
export const getSmsTemplateCode = (serviceName, type, params) => {
    return getRequest(`/legion/setting/sms/templateCode/${serviceName}/${type}`, params)
}
// 编辑sms配置
export const editSmsSet = (params) => {
    return postRequest('/legion/setting/sms/set', params)
}
// 获取email配置
export const getEmailSet = (serviceName, params) => {
    return getRequest('/legion/setting/email', params)
}
// 编辑email配置
export const editEmailSet = (params) => {
    return postRequest('/legion/setting/email/set', params)
}
// 获取vaptcha配置
export const getVaptchaSet = (params) => {
    return getRequest('/legion/setting/vaptcha', params)
}
// 编辑vaptcha配置
export const editVaptchaSet = (params) => {
    return postRequest('/legion/setting/vaptcha/set', params)
}
// 获取vaptcha配置
export const getOtherSet = (params) => {
    return getRequest('/legion/setting/other', params)
}
// 编辑other配置
export const editOtherSet = (params) => {
    return postRequest('/legion/setting/other/set', params)
}
// 获取notice配置
export const getNoticeSet = (params) => {
    return getRequest('/legion/setting/notice', params)
}
// 编辑notice配置
export const editNoticeSet = (params) => {
    return postRequest('/legion/setting/notice/set', params)
}
// 获取autoChat配置
export const getAutoChatSet = (params) => {
    return getRequest('/legion/setting/autoChat', params)
}
// 编辑autoChat配置
export const editAutoChatSet = (params) => {
    return postRequest('/legion/setting/autoChat/set', params)
}
// 查看私密配置
export const seeSecretSet = (settingName, params) => {
    return getRequest(`/legion/setting/seeSecret/${settingName}`, params)
}



// 表格生成
export const generateTable = (name, rowNum, params) => {
    return postBodyRequest(`/legion/generate/table/${name}/${rowNum}`, params)
}
// 树生成
export const generateTree = (name, rowNum, enableTable, params) => {
    return postBodyRequest(`/legion/generate/tree/${name}/${rowNum}/${enableTable}`, params)
}
// 通过实体类生成Vue代码Json数据
export const getEntityData = (params) => {
    return getRequest('/legion/generate/getEntityData', params)
}



// 分页获取禁用词
export const getStopWordData = (params) => {
    return getRequest('/legion/stopWord/getByCondition', params)
}
// 添加禁用词
export const addStopWord = (params) => {
    return postRequest('/legion/stopWord/save', params)
}
// 编辑禁用词
export const editStopWord = (params) => {
    return postRequest('/legion/stopWord/edit', params)
}
// 删除禁用词
export const deleteStopWord = (params) => {
    return postRequest('/legion/stopWord/delByIds', params)
}



// base64上传
export const base64Upload = (params) => {
    return postRequest('/legion/upload/file', params)
}