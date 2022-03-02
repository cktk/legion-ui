import { getRequest, postRequest, putRequest, postBodyRequest, getNoAuthRequest, postNoAuthRequest } from '@/libs/axios';


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

export function getGenTable(query) {
    return getRequest('/legion/generator/table', query)
}

export function getForm(tableName, dsName) {
    return getRequest('/legion/form/info', {tableName: tableName, dsName: dsName})
}

export function postForm(formInfo, tableName, dsId) {
    return postRequest('/legion/form/',Object.assign({formInfo, tableName, dsId}))
}
