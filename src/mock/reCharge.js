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
    'data|20': [{
        //充值ID
        'reChargeID|+1': 1,
        //充值编号
        'reChargeNum|+1': 1,
        //充值卡号
        'reChargeCard': '123125',
        //充值时间
        'reChargeDate': '2022/12/29',
        //充值金额
        'reChargeMoney': '100',
        //充值后余额
        'balance': '1000'

    }]
})

//设置接口
Mock.mock('/getreCharge', 'get', (config) => {
    return data
})

//增加充值记录
Mock.mock('/addreCharge', 'post', (config) => {
    console.log(config);
    const req = JSON.parse(config.body)
    console.log(req);
    data.push(req)
    return {
        code: '200',
        msg: '添加成功'
    }
})