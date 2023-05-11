import ajax from '@/utils/request.js'
//导入 mock 文件

import '@/mock/manager.js'

//获取商品列表
export function getManagerList() {
    return ajax({
        //mock中定义的接口
        url: '/getManager'
    })
}

//新增会员
export function addManager(params) {
    return ajax({
        url: '/addManager',
        method: 'post',
        data: params

    })
}

//修改会员
export function editManager(params) {
    return ajax({
        // mock 中定义的接口
        url: '/editManager',
        method: 'post',
        data: params
    })
}

// 删除的会员
export function delManager(params) {
    return ajax({
        // mock 中定义的接口
        url: '/delManager',
        method: 'post',
        data: params
    })
}

//查找会员
export function searchManager(params) {
    return ajax({
        url: '/searchManager',
        method: 'post',
        data: params
    })
}

//充值
//
export function rCharge(data) {
    return ajax({
        url: '/rCharge',
        method: 'post',
        data
    })

}