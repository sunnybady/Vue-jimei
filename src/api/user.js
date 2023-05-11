import ajax from '@/utils/request'

export function loginFn (params) {

    return ajax({
        method: 'PoSt',
        url: '/admin/login',
        data: params
    })

}

