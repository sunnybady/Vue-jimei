// 首页数据全部在这里进行模拟
import Mock from "mockjs";

let { data1 } = Mock.mock({
    'data1|10': [
        {

            'date': '上午 08:30-09:00',
            "id|+1": 1,
            'user|1': ['待确认', '到店', '已完成', '已取消', '未付款'],


        }
    ]
})

Mock.mock('/getProList1', 'post', (config) => {

    const req = JSON.parse(config.body)
    console.log('数据请求成功', req);
    return data1
})

let { data2 } = Mock.mock({
    'data2|30': [
        {

            'date': '上午 08:30-09:00',
            "id|+1": 1,
            'name|1': ' @cname(3)',
            'item|1': ['洗剪吹', '染发', '做发型'],
            'state|1': ['已完成', '已取消', '已到店'],
            'payment|1': ['未付款', '已付款']

        }
    ]
})

Mock.mock('/getProList2', 'post', (config) => {

    const req = JSON.parse(config.body)
    console.log('数据请求成功', req);
    return data2
})

//删除数据
Mock.mock('/deleteProList1', 'post', (config) => {

    const req = JSON.parse(config.body)
    // console.log('数据请求成功', req);
    let res = {
        code: '200',
        msg: '删除失败'
    }
    data1.forEach((item, index) => {
        // 找到要修改的对象了
        if (item.id == req.id) {
            // 删除元素
            data1.splice(index, 1)

            res.msg = '删除成功'
        }
    });

    return res
})
//删除数据
Mock.mock('/deleteProList2', 'post', (config) => {

    const req = JSON.parse(config.body)
    // console.log('数据请求成功', req);
    let res = {
        code: '200',
        msg: '删除失败'
    }
    data2.forEach((item, index) => {
        // 找到要修改的对象了
        if (item.id == req.id) {
            // 删除元素
            data2.splice(index, 1)

            res.msg = '删除成功'
        }
    });

    return res
})

//修改数据
Mock.mock('/edit', 'post', (config) => {

    const req = JSON.parse(config.body)
    
    let res = {
        code: '200',
        msg: '修改失败'
    }
    // 1. 将要修改的 id 传递过来
    data.forEach((item, index) => {
        // 找到要修改的对象了
        if (item.id == req.id) {
            data[index] = req
            res.msg = '修改成功'
        }
    });
    // 2. 要修改的具体内容传递过来

    return res
})



