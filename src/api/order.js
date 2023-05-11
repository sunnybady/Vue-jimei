import ajax from '@/utils/request.js'
//导入 mock 文件

import '@/mock/order.js'

//获取商品列表
export function getProList1 (data) {
    return ajax({
        // mock 中定义的接口
        url: '/getProList1',
        method: 'post',
        data
    })
}
export function getProList2 (data) {
    return ajax({
        // mock 中定义的接口
        url: '/getProList2',
        method: 'post',
        data
    })
}

//删除数据
export function deleteAdmin (params) {
    return ajax({
        url: '/deleteProList1',
        method: 'post',
        data: params
    })
}

export function deleteAdmin1 (params) {
    return ajax({
        url: '/deleteProList2',
        method: 'post',
        data: params
    })
}

// 修改产品数据
export function edit (data) {
    return ajax({
        url: '/edit',
        method: 'post',
        data
    })
}