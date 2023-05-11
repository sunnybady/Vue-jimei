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
    'data|10': [{
        //员工编号
        'employeeCard|+1': 1,
        //员工姓名
        'employeeName': '@ctitle(3)',
        //员工职位
        'employeePosition': '@ctitle(2)',
        //员工电话
        'employeeTell': '1370588741',

    }]
})

//设置接口
Mock.mock('/getEmployee', 'get', (config) => {
    return data
})