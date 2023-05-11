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
        'managerCard|+1': 1,
        //会员名称名称
        'managerName|1': ['白居易', '李白', '杜甫'], //'@ctitle(3)'
        //日期
        'cardDate': '2022/12/12',
        'managerTell': '13745828951',
        //密码
        'password': '123456',
        //余额
        'balance': 100,
        //会员卡状态
        'managerState|1': ['激活', '未激活'],
        //备注
        'remarks': '无',
        //会员等级
        'managerLv|1': ['白金卡', '钻石卡', '金卡']

    }]
})

//设置接口
//获取会员列表
Mock.mock('/getManager', 'get', (config) => {
    return data
})

//添加会员
Mock.mock('/addManager', 'post', (config) => {
    console.log(config);
    const req = JSON.parse(config.body)
    console.log(req);
    data.push(req)
    return {
        code: '200',
        msg: '添加成功'
    }
})

//修改会员
Mock.mock('/editManager', 'post', (config) => {

    const req = JSON.parse(config.body)
        // console.log('数据请求成功', req);
    let res = {
            code: '200',
            msg: '修改失败'
        }
        // 1. 将要修改的 id 传递过来
    data.forEach((item, index) => {
        // 找到要修改的对象了
        if (item.managerCard == req.managerCard) {
            data[index] = req
            res.msg = '修改成功'
        }
    });
    // 2. 要修改的具体内容传递过来

    return res
})

//删除会员
Mock.mock('/delManager', 'post', (config) => {

    const req = JSON.parse(config.body)
        // console.log('数据请求成功', req);
    let res = {
        code: '200',
        msg: '删除失败'
    }
    data.forEach((item, index) => {
        // 找到要修改的对象了
        if (item.managerCard == req.managerCard) {
            // 删除元素
            data.splice(index, 1)

            res.msg = '删除成功'
        }
    });

    return res
})

//查询
Mock.mock('/searchManager', 'post', (config) => {

        const req = JSON.parse(config.body)._value
            //console.log('数据请求成功', req);
        let newarr = []
        let flag = false
        if (req.managerName || req.managerLv || req.managerCard) {
            flag = true
            if (req.managerCard) {
                newarr = data.filter(item => {
                    return item.managerCard === Number(req.managerCard)
                })
            }
            if (req.managerName) {
                newarr = data.filter(item => {
                    return item.managerName === req.managerName
                })
            }
            if (req.managerLv && req.managerName) {
                newarr = data.filter(item => {
                    return item.managerLv === req.managerLv && item.managerName === req.managerName
                })
            }
        }
        //console.log('1111', newarr);
        if (flag) {
            return newarr
        }

    })
    //充值

Mock.mock('/rCharge', 'post', (config) => {

    const req = JSON.parse(config.body)
    console.log('数据请求成功', req);
    let res = {
            code: '200',
            msg: '修改失败'
        }
        //1. 将要修改的 id 传递过来
    data.forEach((item, index) => {
        // 找到要修改的对象了
        if (item.managerCard == req.reChargeCard) {
            data[index].balance = data[index].balance + Number(req.reChargeMoney)
            console.log(data[index]);
            res.msg = '充值成功'
        }
    });
    //2. 要修改的具体内容传递过来

    return res
})