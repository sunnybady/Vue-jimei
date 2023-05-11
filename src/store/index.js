import { createStore } from 'vuex'
//引入配置数据持久化
import createPersistedState from 'vuex-persistedstate'
import { getVIPmessage } from "../api/cashier"
import { changeData } from "../api/cashier"

//定义全局状态状态的实例
const store = createStore({
    state() {
        return {
            count: 100,
            //放用户的信息
            adminInfo: {

            },
            //记录当前的路由路径
            currentPath: '/',
            flag: false,
            mydate: '2022/10/13',
            tableData: [
                {
                    mproject: "项目",
                    num: "数量",
                    payment: "收款方式",
                    money: "首款金额",
                    // take:'操作 删除'
                },
            ],
            value1: "2022/10/13",

            myTD: {
                flag: true,
                Project: '',
                money: '',
                inpFlag: false,
                selFlag: false,
                showPro: false
            },
            remarkFlag: false,
            screenFlag: false,

            searchFlag: false,
            searchres: [],
            vipMessage: {},
            vipMesFlag: false,
            copVIPmes :{},
        }
    },
    //唯一修改数据的方法
    mutations: {
        add(state) {
            state.count++
        },

        updateUserInfo(state, value) {
            state.adminInfo = value
        },
        //修改路由的办法
        updateCurrentPath(state, value) {
            state.currentPath = value
        },
        showDate(state, value) {
            state.flag = !state.flag
        },

        getDate(state, value) {
            state.value1 = value
            state.flag = !state.flag
            // console.log(value);
        },
        changeP(state, value) {
            console.log(state.tableData);
            state.myTD.showPro = true
        },
        getPro(state, value) {
            // console.log(state.tableData);
            state.myTD.Project = value[1]
            state.myTD.money = value[0]
            state.myTD.flag = false
        },

        subPro(state, value) {
            // if (!state.flag && value[0] && value[1]) {
            state.tableData[0].num = value[0]
            state.tableData[0].payment = value[1]
            state.tableData[0].money = state.myTD.Project * value[0] + "¥"
            state.tableData[0].mproject = state.myTD.money
            console.log(1);
            // }
            state.myTD.showPro = false

        },
        clearPro(state, value) {
            state.tableData = [
                {
                mproject: "编号",
                num: "数量",
                payment: "收款方式",
                money: "首款金额",
            }
        ]
        },
        remF(state, value) {
            state.remarkFlag = true
        },
        search(state, value) {

            getVIPmessage().then(res => {
                console.log(res.data);

                state.searchres = res.data.filter((item) => {

                    return item.vipName === value
                })

            })
        },
        showVip(state, value) {
            console.log(value);
            state.vipMessage = value
            state.vipMesFlag = true
        },
        remVIP(state, value) {
            console.log(value);
            changeData(2).then(res => {

            })
        },
        CopyVip(state,value) {
            for (let key in state.vipMessage) {
              state.copVIPmes[key] = state.vipMessage[key];
            }
          }

    },
    //异步修改数据的地方
    actions: {
        addActions(context) {
            setTimeout(() => {

            })
        }

    },
    //是vuex中的计算属性
    getters: {
        butFlag(state) {
            if (!state.myTD.flag && state.myTD.inpFlag && state.myTD.selFlag) {
                return false
            } else {
                return true
            }
        }
    },
    //状态模块
    modules: {

    },
    plugins: [
        //配置持久化数据
        createPersistedState({
            reducer: state => {
                return {
                    adminInfo: state.adminInfo
                }
            }
        })
    ]
})

export default store