import ajax from '@/utils/request.js'
//导入 mock 文件

import '@/mock/reCharge.js'


//获取充值列表
export function getreCharge() {
    return ajax({
        //mock中定义的接口
        url: '/getreCharge'
    })
}

//新增充值记录
export function addreCharge(params) {
    return ajax({
        url: '/addreCharge',
        method: 'post',
        data: params

    })
}