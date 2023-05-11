//首页的数据都在这里模拟
import Mock from 'mockjs'
/*
    1. cnpm i mockjs 安装
    2. 在项目的 src 目录中创建一个 mock 文件夹
    3. 在 mock 文件夹中需要哪个页面的数据就直接创建一个同名的 js 文件如 home.js
    4. 在该文件中先导入 Mock
    5. 通过 Mock.mock 生成我们需要的数据
    6. 生一个请求的接口，可以是 get 请求也可以是 post 请求
    7. 安装 axios
    8. 将 utils 文件拿过来
    9. 将 utils 的 request.js 中将 baseURL 改为 /
    10. 在创建一个 api 文件夹，然后创建一个 home.js
    11. 在 home.js 中需要导入 mock 文件
    12. 在组件中直接请求数据即可
    http://mockjs.com/examples.html#Random\.cname\(\)
*/
//模拟数据
let { data } = Mock.mock({
    'data|50': [{
        //ID
        'proCard|+1': 1,
        //项目名称名称
        'proName|1': ['洗剪吹', '烫', '染'],
        //项目价格
        'proPrice|1': ['100', '200', '300'],
        //备注
        'remarks': '无'

    }]
})

//设置接口
Mock.mock('/getProject', 'get', (config) => {
    return data
})

//添加项目
Mock.mock('/addProject', 'post', (config) => {
    console.log(config);
    const req = JSON.parse(config.body)
    console.log(req);
    data.push(req)
    return {
        code: '200',
        msg: '添加成功'
    }
})

//修改项目
Mock.mock('/editProject', 'post', (config) => {

    const req = JSON.parse(config.body)
        // console.log('数据请求成功', req);
    let res = {
            code: '200',
            msg: '修改失败'
        }
        // 1. 将要修改的 id 传递过来
    data.forEach((item, index) => {
        // 找到要修改的对象了
        if (item.proCard == req.proCard) {
            data[index] = req
            res.msg = '修改成功'
        }
    });
    // 2. 要修改的具体内容传递过来

    return res
})

//删除项目
Mock.mock('/delProject', 'post', (config) => {

    const req = JSON.parse(config.body)
        // console.log('数据请求成功', req);
    let res = {
        code: '200',
        msg: '删除失败'
    }
    data.forEach((item, index) => {
        // 找到要修改的对象了
        if (item.proCard == req.proCard) {
            // 删除元素
            data.splice(index, 1)

            res.msg = '删除成功'
        }
    });

    return res
})

//查询

Mock.mock('/searchProject', 'post', (config) => {

    const req = JSON.parse(config.body)
    console.log('数据请求成功', req);
    let proPrice = req.proPrice
    let proName = req.proName
    let res = {
        code: '200',
        msg: '检索失败',
        newdata: {}
    }
    let newData = data.filter(item => {
        let flag1 = proPrice == item.proPrice
        let flag2 = proName == item.proName
        return flag1 && flag2
    })
    res.newdata = newData
    res.msg = '检索成功'
    return res
})