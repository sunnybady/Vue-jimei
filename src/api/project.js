import ajax from '@/utils/request.js'
//导入 mock 文件

import '@/mock/project.js'

//获取项目列表
export function getProjectList() {
    return ajax({
        //mock中定义的接口
        url: '/getProject'
    })
}


//新增项目
export function addProject(params) {
    return ajax({
        url: '/addProject',
        method: 'post',
        data: params

    })
}

//修改项目
export function editProject(params) {
    return ajax({
        // mock 中定义的接口
        url: '/editProject',
        method: 'post',
        data: params
    })
}

// 删除的项目
export function delProject(params) {
    return ajax({
        // mock 中定义的接口
        url: '/delProject',
        method: 'post',
        data: params
    })
}

//查找项目
export function searchProject(params) {
    return ajax({
        url: '/searchProject',
        method: 'post',
        data: params
    })
}