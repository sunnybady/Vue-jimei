import ajax from '@/utils/request.js'
//导入 mock 文件

import '@/mock/service.js'

//获取商品列表
export function getService() {
    return ajax({
        //mock中定义的接口
        url: '/getService'
    })
}