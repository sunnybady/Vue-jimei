import ajax from '../utils/request'
import"../mock/cashier.js"
// import Buffer from "vue-buffer";
// 请求会员数据
export function getVIPmessage() {
    return ajax({
        url: "/getVIPmessage"
    })
}
// 修改会员数据
export function changeData() {
    return ajax({
        url: "/edit",
        

    })
}