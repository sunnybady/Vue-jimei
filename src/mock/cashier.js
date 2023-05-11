import Mock from 'mockjs'
// import Buffer from "vue-buffer";
let useData = Mock.mock({
    'data|5': [
        {
            // 会员名称
            'vipName|1': ['核桃', '萨摩', '小柴', '蔡文姬', '桃子'],
            'telephone|+1': 13000000000,
            'sex|1': ['男', '女'],
            'cardnum|+1': 10081,
            'birthday|1': ['1998/12/5', '1999/10/1', '2000/9/23', '1999/12/30', '1999/12/9',],
            'paypassword': 123456,
            'id|+1': 1

        },
    ]
})

Mock.mock('/getVIPmessage', 'get', (config) => {

   
    return useData
    console.log('数据请求成功 ');
})
Mock.mock('/edit', 'post', (config) => {
     const req = JSON.parse(config.body)
    useData.forEach(item => {
        if (item.id === req.id) {

        }
    });
    return useData
    console.log('数据请求成功 ');
})