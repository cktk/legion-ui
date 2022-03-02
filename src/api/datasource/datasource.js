/*
 *    Copyright (c) 2018-2025, medical All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of the pig4cloud.com developer nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * Author: medical
 */
import { getRequest, postRequest, putRequest, postBodyRequest, getNoAuthRequest, postNoAuthRequest } from '@/libs/axios';

// import request from '@/router/axios'

export function fetchList(query) {
  return getRequest('/legion/generator/page', query)
}

export function fetchDsList(query) {
  return getRequest( '/legion/datasource/page', query)
}

export function fetchSelectDsList() {
  return getRequest( '/legion/datasource/list')
}

export function addObj(obj) {
  return postRequest('/legion/datasource/', obj)
}

export function getObj(id) {
  return getRequest('/legion/datasource/' + id,)
}

export function delObj(id) {
  return getRequest('/legion/datasource/' + id)
}

export function putObj(obj) {
  return putRequest('/legion/datasource/' ,obj)
}

export function preview(table) {
  return getRequest('/legion/generator/preview', table)
}

// export function handleDown(table) {
//   return postRequest({
//     url: '/legion/generator/code',
//     method: 'post',
//     data: table,
//     responseType: 'arraybuffer'
//   }).then((response) => { // 处理返回的文件流
//     const blob = new Blob([response.data], {type: 'application/zip'})
//     const filename = table.tableName + '.zip'
//     const link = document.createElement('a')
//     link.href = URL.createObjectURL(blob)
//     link.download = filename
//     document.body.appendChild(link)
//     link.click()
//     window.setTimeout(function () {
//       URL.revokeObjectURL(blob)
//       document.body.removeChild(link)
//     }, 0)
//   })
// }

export function getGenTable(query) {
  return getRequest('/legion/generator/table', query)
}

export function getForm(tableName, dsName) {
  return getRequest('/legion/form/info', {tableName: tableName, dsName: dsName})
}

export function postForm(formInfo, tableName, dsId) {
  return postRequest('/legion/form/',Object.assign({formInfo, tableName, dsId}))
}
