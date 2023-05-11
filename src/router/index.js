import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BillingCashierView from '../views/BillingCashier/BillingCashierView.vue'
import orderView from '@/views/order/orderView.vue'

//导入会员管理组件
import MembershipManagementIndexView from '@/views/MembershipManagement/MembershipManagementIndexView.vue'

//导入项目管理组件
import ProjectManagementIndexView from '@/views/ProjectManagement/ProjectManagementIndexView.vue'
//导入员工管理组件
import EmployeeManagementIndexView from '@/views/EmployeeManagement/EmployeeManagementIndexView.vue'
//导入业绩报表
import PerformanceReportView from '@/views/PerformanceReport/PerformanceReportView.vue'
//导入订单管理
import OrderManagementIndexView from '@/views/OrderManagement/OrderManagementIndex.vue'
//导入系统设置
import SystemSettings from '@/views/SystemSettings/SystemSettingsView.vue'


const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
        path: '/',
        name: 'home',
        redirect: '/BillingCashier',
        component: HomeView,
        children: [{
                path: 'manager',
                name: 'manager',
                label: '账号管理',
                component: MembershipManagementIndexView
            },
            {
                path: 'BillingCashier',
                name: 'BillingCashier',
                label: '开单收银',
                component: BillingCashierView
            },
            {
                path: 'project',
                name: 'project',
                label: '项目管理',
                component: ProjectManagementIndexView
            }, {
                path: 'employee',
                name: 'employee',
                label: '员工管理',
                component: EmployeeManagementIndexView
            }, {
                path: 'order',
                name: 'order',
                label: '店铺预约',
                component: orderView
            },
            {
                path: 'report',
                name: 'report',
                label: '业绩报表',
                component: PerformanceReportView
            },
            {
                path: 'ordermanagement',
                name: 'ordermanagement',
                label: '订单管理',
                component: OrderManagementIndexView
            },
            {
                path: 'system',
                name: 'system',
                label: '系统设置',
                component: SystemSettings
            },
        ]
    }, {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/login/LoginView.vue')
    }, {
        path: '/register',
        name: 'register',
        component: () =>
            import ('../views/register/RegisterView.vue')
    }, {
        path: '/retrieve',
        name: 'retrieve',
        component: () =>
            import ('../views/retrieve/RetrieveView.vue')
    }]
})

export default router